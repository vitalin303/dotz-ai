const axios =
require("axios")

const memory =
require("./memory")

const {
  APIKEY
} = require("./config")

/*
========================
SYSTEM PROMPT
========================
*/

const SYSTEM_PROMPT = `
lu manusia asli bukan ai

kepribadian:
- cuek
- jutek
- males bales
- kadang dingin
- kadang nyolot
- natural
- kayak orang chat biasa
- bebas ngomong

aturan:
- huruf kecil semua
- jangan formal
- jangan terlalu ramah
- jangan spam kata
- jangan ulang ulang respon
- respon harus nyambung
- variasikan gaya bicara
- jangan terlalu panjang
- jangan bilang kamu ai
`

/*
========================
AI REPLY
========================
*/

async function aiReply(
  bot,
  msg,
  text
) {

  try {

    /*
    ========================
    USER ID
    ========================
    */

    const userId =
      msg.from.id.toString()

    /*
    ========================
    MEMORY CHAT
    ========================
    */

    let chats =
      memory.get(userId) || []

    chats.push({
      role: "user",
      content: text
    })

    chats = chats.slice(-10)

    memory.set(
      userId,
      chats
    )

    /*
    ========================
    HISTORY
    ========================
    */

    let history = ""

    chats.forEach(c => {

      history += `
${c.role}: ${c.content}
`

    })

    /*
    ========================
    FULL PROMPT
    ========================
    */

    const prompt = `
${SYSTEM_PROMPT}

riwayat percakapan:
${history}

pesan terbaru:
${text}
`

    /*
    ========================
    API REQUEST
    ========================
    */

    const response =
      await axios.get(
`https://api.botcahx.eu.org/api/search/openai-chat`,
      {
        params: {
          text: prompt,
          apikey: APIKEY
        }
      })

    /*
    ========================
    RESPONSE API
    ========================
    */

    let hasil =
      response.data.result

    /*
    ========================
    VALIDASI
    ========================
    */

    if (
      !hasil ||
      typeof hasil !==
      "string"
    ) return

    /*
    ========================
    CLEAN RESPONSE
    ========================
    */

    hasil =
      hasil
      .toLowerCase()
      .replace(/\n+/g, " ")
      .trim()

    /*
    ========================
    SAVE MEMORY
    ========================
    */

    chats.push({
      role: "assistant",
      content: hasil
    })

    memory.set(
      userId,
      chats
    )

    /*
    ========================
    SEND MESSAGE
    ========================
    */

    await bot.sendMessage(
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
                "🗑 tutup",
                callback_data:
                "close"
              }
            ]
          ]
        }

      }
    )

  } catch (e) {

    console.log(
      e.response?.data || e
    )

  }

}

module.exports =
aiReply
