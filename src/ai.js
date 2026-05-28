const axios =
require("axios")

const memory =
require("./memory")

const {
  APIKEY
} = require("./config")

const SYSTEM_PROMPT = `
Kamu adalah DOTZ AI.

Kepribadian:
- seperti manusia asli
- santai
- aesthetic
- lucu
- ramah
- jangan formal
- jawaban natural
- kadang emoji
- singkat

Kalau di grup:
- jawab natural
- jangan terlalu panjang
`

async function aiReply(
  bot,
  msg,
  text
) {

  const userId =
    msg.from.id.toString()

  let chats =
    memory.get(userId) || []

  chats.push({
    role: "user",
    content: text
  })

  chats = chats.slice(-5)

  memory.set(
    userId,
    chats
  )

  let history = ""

  chats.forEach(c => {

    history += `
${c.role}: ${c.content}
`

  })

  const prompt = `
${SYSTEM_PROMPT}

Riwayat:
${history}

Pesan:
${text}
`

  const url =
`https://api.botcahx.eu.org/api/search/openai-chat?text=${encodeURIComponent(prompt)}&apikey=${APIKEY}`

  const res =
    await axios.get(url)

  const hasil =
    res.data.result ||
    "Aku bingung 😭"

  chats.push({
    role: "assistant",
    content: hasil
  })

  memory.set(
    userId,
    chats
  )

  bot.sendMessage(
    msg.chat.id,
    hasil,
    {
      reply_to_message_id:
      msg.message_id,

      reply_markup: {
        inline_keyboard: [
          [
            {
              text:
              "🗑 Tutup",
              callback_data:
              "close"
            }
          ]
        ]
      }

    }
  )

}

module.exports =
aiReply
