'use server';

/**
 * @fileOverview This file defines an AI-powered chatbot flow that answers questions about St. Xavier's School Deonia.
 *
 * - aiQuickAnswers - A function that accepts a question and returns an answer based on the website content.
 * - AIQuickAnswersInput - The input type for the aiQuickAnswers function (a question string).
 * - AIQuickAnswersOutput - The return type for the aiQuickAnswers function (an answer string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIQuickAnswersInputSchema = z.string().describe('The question to ask the AI chatbot.');
export type AIQuickAnswersInput = z.infer<typeof AIQuickAnswersInputSchema>;

const AIQuickAnswersOutputSchema = z.string().describe('The AI chatbot answer to the question.');
export type AIQuickAnswersOutput = z.infer<typeof AIQuickAnswersOutputSchema>;

export async function aiQuickAnswers(question: AIQuickAnswersInput): Promise<AIQuickAnswersOutput> {
  return aiQuickAnswersFlow(question);
}

const prompt = ai.definePrompt({
  name: 'aiQuickAnswersPrompt',
  input: {schema: AIQuickAnswersInputSchema},
  output: {schema: AIQuickAnswersOutputSchema},
  prompt: `You are an AI chatbot providing information about St. Xavier's School Deonia.
  Answer the following question based on the provided website content.
  If you cannot answer the question based on the content, please say you do not know.

  Question: {{{$input}}} `,
});

const aiQuickAnswersFlow = ai.defineFlow(
  {
    name: 'aiQuickAnswersFlow',
    inputSchema: AIQuickAnswersInputSchema,
    outputSchema: AIQuickAnswersOutputSchema,
  },
  async question => {
    const {text} = await ai.generate({
        prompt: `You are an AI chatbot providing information about St. Xavier's School Deonia.
        Answer the following question based on the provided website content.
        If you cannot answer the question based on the content, please say you do not know.

        Question: ${question}`
    });
    return text!;
  }
);
