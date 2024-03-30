import { openai } from './openai.js'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const newMessage = async (history, message) => {
  const result = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...history, message],
    temperature: 0, // less creative. don't lie
  })

  return result.choices[0].message
}

const formatMessage = (userInput) => ({
  role: 'user',
  content: userInput,
})

const chat = () => {
  let history = [
    {
      role: 'system',
      content:
        'You are an AI assistant, answer any questions to the best of your ability',
    },
  ]

  const start = () => {
    rl.question('You: ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        rl.close()
        return
      } else if (userInput.toLowerCase() === 'summarize') {
        const summary = await newMessage(
          history,
          formatMessage('Summarize the chat till now in 100 words')
        )
        history = [
          {
            role: 'system',
            content:
              'You are an AI assistant, answer any questions to the best of your ability',
          },
        ]
        history.push(summary)
        console.log(`\n\nAI: ${summary.content} \n\n`)
        start()
      } else {
        const userMessage = formatMessage(userInput)
        const response = await newMessage(history, userMessage)

        history.push(userMessage, response)
        console.log(`\n\nAI: ${response.content} \n\n`)
        start()
      }
    })
  }

  start()
}

console.log("Chatbot initialized. Type 'exit' to end the chat")
chat()
