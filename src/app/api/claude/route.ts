// app/api/claude/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { question, context } = await request.json();

        const completion = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1024,
            messages: [
                { role: "user", content: `You are an AI assistant that responds to questions about Flo. Take into account that Flo is the one whos gonna make the questions. Dont respond so formal, just as if a human was answering. There is no need you include everything in the context, just foucs on question based context and 1 more thing, not much more. Also make you answer no longer than 40 words. She doesnt do thats what she said jokes on her tours. Use the following context to inform your responses, here is some context: ${context}, and here is the question: ${question}` },
            ],
        })
        const answer = completion.content || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ answer }, { status: 200 });
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
    }
}

