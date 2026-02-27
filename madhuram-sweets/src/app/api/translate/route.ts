import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

// Language name mapping for better translation context
const languageNames: Record<string, string> = {
  hi: 'Hindi',
  bn: 'Bengali',
  te: 'Telugu',
  mr: 'Marathi',
  ta: 'Tamil',
  gu: 'Gujarati',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
  or: 'Odia',
  as: 'Assamese',
  ur: 'Urdu',
  en: 'English',
};

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { success: false, error: 'Text and targetLanguage are required' },
        { status: 400 }
      );
    }

    // If target language is English, return original text
    if (targetLanguage === 'en') {
      return NextResponse.json({ success: true, translatedText: text });
    }

    const languageName = languageNames[targetLanguage] || targetLanguage;
    
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a professional translator for an Indian sweets e-commerce website called "Madhuram Sweets". 
          
Translate the given text to ${languageName}. 
Rules:
1. Keep the translation natural and culturally appropriate for Indian context
2. DO NOT translate email addresses, phone numbers, URLs, or prices (₹ symbols and amounts)
3. Keep product names in their original form if they are proper nouns (like "Kaju Barfi", "Rasgulla")
4. Use appropriate Indian cultural context and respectful language
5. For temple/religious context, maintain the spiritual tone
6. Only return the translated text, nothing else - no explanations or additional text`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
    });

    const translatedText = completion.choices[0]?.message?.content || text;

    return NextResponse.json({ 
      success: true, 
      translatedText 
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { success: false, error: 'Translation failed' },
      { status: 500 }
    );
  }
}
