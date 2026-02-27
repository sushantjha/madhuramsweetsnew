import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

// Product data for the AI to reference
const PRODUCTS_INFO = `
PRODUCTS AVAILABLE:

DAIRY:
- Dahi (दही) - ₹120/1kg - Fresh creamy curd
- Khowa/Mawa (खोया) - ₹400/1kg - Pure milk solids
- Paneer (पनीर) - ₹350/1kg - Fresh cottage cheese

FEATURED - MAHAPRASAD:
- Peda Mahaprasad - ₹400/1kg - Sacred offering from Baba Baidyanath Dham

SWEETS:
- Rasgulla - ₹10/pc - Spongy milk sweet in sugar syrup
- Gulab Jamun - ₹10/pc - Soft milk dumplings in rose syrup
- Jalebi - ₹10/pc - Crispy spiral sweet
- Doda Barfi - ₹500/kg - Rich wheat barfi
- Raj Bhog - ₹20/pc - Royal saffron rasgulla
- Kaju Barfi - ₹950/kg - Premium cashew barfi
- Milk Cake - ₹500/kg - Caramelized milk sweet
- Motichur Ladoo - ₹180/500g - Pearl-like gram flour ladoo
- Besan Ladoo - ₹180/500g - Gram flour ladoo
- Ghee Ladoo - ₹400/kg - Whole wheat ladoo
- Gondh Ladoo - ₹500/kg - Nutritious edible gum ladoo
- Khowa Tikki - ₹15/pc or ₹700/kg - Khoya sweet
- RasRaj - ₹20/pc or ₹750/kg - Rasgulla-like sweet
- Allahabadi Barfi - ₹15/pc or ₹600/kg - Special barfi
- Sondesh - ₹500/kg - Bengali sweet
- Papaya Ladoo - ₹20/pc
- Nariyal Ladoo - ₹20/pc - Coconut ladoo
- Dry Fruit Ladoo - ₹20/pc
- Pumpkin Ladoo - ₹20/pc

SPECIALTY:
- Pure Honey - ₹185/250g - Organic honey
- Ghar ka Shuddh Ghee - ₹1135/kg - Traditional Bilona ghee

SNACKS:
- Samosa with Chutney - ₹10/pc
- Subah ka Nashta (Kachori+Sabji) - ₹30/3pc
- Punjabi Mathri - ₹10/5pc

BEVERAGES: Various cold drinks, juices, water (₹10-125)

ICE CREAMS: Amul ice creams (₹10-40)
`;

const SHOP_INFO = `
SHOP INFORMATION:
- Name: Madhuram Sweets - Pure & Sure
- Tagline: Jyotirling Baba Baidyanath Dham ka Mahaprasad
- Location: HadHadiya Pool, Deoghar College Road, Deoghar, Jharkhand – 814112
- Phone: 07710084997
- WhatsApp: +91 77100 84997
- Email: vikas9719@gmail.com, bababaijnath@MadhuraMsweets.com
- Timings: Mon-Sat 8:00 AM - 9:00 PM, Sunday 9:00 AM - 8:00 PM
- Delivery: FREE delivery across India, same-day delivery in Deoghar
- Special: We are near Baba Baidyanath Dham temple, one of the 12 Jyotirlingas
`;

export async function POST(request: NextRequest) {
  try {
    const { message, cartItems, action } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // Build cart context if provided
    let cartContext = '';
    if (cartItems && cartItems.length > 0) {
      cartContext = `\n\nUSER'S CURRENT CART:\n${cartItems.map((item: { name: string; quantity: number; price: number; weight?: string }) => 
        `- ${item.name} (${item.weight || '1pc'}) x ${item.quantity} = ₹${item.price * item.quantity}`
      ).join('\n')}\nTotal items: ${cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)}`;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful and friendly AI assistant for Madhuram Sweets, a traditional Indian sweet shop in Deoghar, Jharkhand near the holy Baba Baidyanath Dham temple.

${SHOP_INFO}

${PRODUCTS_INFO}

${cartContext}

YOUR PERSONALITY:
- Warm, respectful, and helpful
- Use Indian cultural greetings like "Namaste 🙏" and "Jai Baba Baidyanath!"
- Be knowledgeable about products and their significance
- Suggest products based on occasions (festivals, weddings, temple offerings)
- Be concise but informative

ORDERING FLOW:
When a user wants to order something:
1. Confirm the product name, quantity, and weight
2. Tell them the price
3. Respond with a JSON action if they confirm:
   {"action": "add_to_cart", "product": {"name": "Product Name", "quantity": 1, "weight": "1kg", "price": 400}}

When user says "checkout" or "place order" or "buy":
- Respond with {"action": "checkout"}

PRODUCT SUGGESTIONS:
- For temple offerings: Peda Mahaprasad, Motichur Ladoo
- For gifts: Kaju Barfi, Dry Fruit Ladoo
- For festivals: All sweets, especially Ladoos and Barfis
- For daily use: Dahi, Paneer, Ghee, Honey

Always respond in a helpful manner. If asked about something you don't know, politely say so and offer to help with what you can assist with.

IMPORTANT: When you need to perform an action (add to cart, checkout), include a JSON object at the end of your response in this format:
[ACTION]{"action": "add_to_cart", "product": {"name": "Product Name", "quantity": 1, "weight": "500g", "price": 180}}[/ACTION]

Only use actions when user explicitly wants to add something to cart or checkout.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    let responseText = completion.choices[0]?.message?.content || 'I apologize, I could not process your request. Please try again.';
    
    // Extract action if present
    let actionData = null;
    const actionMatch = responseText.match(/\[ACTION\](.*?)\[\/ACTION\]/);
    if (actionMatch) {
      try {
        actionData = JSON.parse(actionMatch[1]);
        // Remove the action JSON from the response
        responseText = responseText.replace(/\[ACTION\].*?\[\/ACTION\]/, '').trim();
      } catch (e) {
        // Invalid JSON, ignore action
      }
    }

    return NextResponse.json({ 
      success: true, 
      response: responseText,
      action: actionData
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
