import { openai } from './openai.js'

const results = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content:
        'You are an AI assistant, answer any questions to the best of your ability',
    },
    {
      role: 'user',
      content: 'Can you please write node js code for bubble sort?',
    },
  ],
})

console.log(results.choices[0].message.content)
