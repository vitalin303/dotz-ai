const TelegramBot =
require(
"node-telegram-bot-api"
)

const chalk =
require("chalk")

const {
BOT_TOKEN
} = require(
"./src/config"
)

const menu =
require(
"./src/menu"
)

const aiReply =
require(
"./src/ai"
)

const imageReply =
require(
"./src/image"
)

const ttsReply =
require(
"./src/tts"
)

const groupMode =
require(
"./src/group"
)

const isOwner =
require(
"./src/owner"
)

const bot =
new TelegramBot(
BOT_TOKEN,
{
polling: true
}
)

const users =
new Set()

console.log(
chalk.green(
"BOT AI AKTIF"
)
)

/*

START

*/

bot.onText(
//start/,
async (msg) => {

users.add(
  msg.chat.id
)

await bot.sendPhoto(
  msg.chat.id,
  "https://files.catbox.moe/k1lo7x.png",
  {
    caption:

`🤖 DOTZ AI

ai chat
ai image
ai tts

owner:
@dotzbaik`,

    reply_markup: {

      inline_keyboard: [

        [
          {
            text: "👤 OWNER",
            url:
            "https://t.me/dotzbaik"
          }
        ],

        [
          {
            text: "🧠 AI CHAT",
            callback_data:
            "ai"
          },

          {
            text: "🎨 IMAGE",
            callback_data:
            "img"
          }
        ],

        [
          {
            text: "🔊 TTS",
            callback_data:
            "tts"
          }
        ]

      ]

    }

  }
)

await bot.sendMessage(
  msg.chat.id,
  menu,
  {
    reply_markup: {
      keyboard: [
        [
          "☰ Menu",
          "🧠 AI"
        ],
        [
          "🎨 Image",
          "🔊 TTS"
        ]
      ],
      resize_keyboard:
      true
    }
  }
)

})

/*

MENU

*/

bot.on(
"message",
async (msg) => {

if (!msg.text)
  return

users.add(
  msg.chat.id
)

if (
  msg.text ==
  "☰ Menu"
) {

  bot.sendMessage(
    msg.chat.id,
    menu
  )

}

})

/*

CHAT

*/

bot.onText(
//chat (.+)/,
async (
msg,
match
) => {

try {

  const text =
  match[1]

  bot.sendChatAction(
    msg.chat.id,
    "typing"
  )

  await aiReply(
    bot,
    msg,
    text
  )

} catch (e) {

  console.log(e)

}

})

/*

IMAGE

*/

bot.onText(
//img (.+)/,
async (
msg,
match
) => {

try {

  const prompt =
  match[1]

  bot.sendChatAction(
    msg.chat.id,
    "upload_photo"
  )

  await imageReply(
    bot,
    msg,
    prompt
  )

} catch {

  bot.sendMessage(
    msg.chat.id,
    "❌ Error image"
  )

}

})

/*

TTS

*/

bot.onText(
//tts (.+)/,
async (
msg,
match
) => {

try {

  const text =
  match[1]

  bot.sendChatAction(
    msg.chat.id,
    "record_voice"
  )

  await ttsReply(
    bot,
    msg,
    text
  )

} catch {

  bot.sendMessage(
    msg.chat.id,
    "❌ Error TTS"
  )

}

})

/*

OWNER PANEL

*/

bot.onText(
//owner/,
async (msg) => {

if (
  !isOwner(msg)
) {

  return bot.sendMessage(
    msg.chat.id,
    "❌ Khusus owner"
  )

}

bot.sendMessage(
  msg.chat.id,

`👑 OWNER PANEL

📌 STATUS:
Bot aktif

📌 USER:
${users.size}

📌 ID:
${msg.from.id}
`
)

})

/*

BROADCAST

*/

bot.onText(
//bc (.+)/,
async (
msg,
match
) => {

if (
  !isOwner(msg)
) {

  return bot.sendMessage(
    msg.chat.id,
    "❌ Khusus owner"
  )

}

const text =
  match[1]

users.forEach(id => {

  bot.sendMessage(
    id,

`📢 BROADCAST

${text}`
)

})

})

/*

AUTO AI REPLY

*/

bot.on(
"message",
async (msg) => {

try {

  const allow =
  await groupMode(
    bot,
    msg
  )

  if (!allow)
    return

  bot.sendChatAction(
    msg.chat.id,
    "typing"
  )

  await aiReply(
    bot,
    msg,
    msg.text
  )

} catch (e) {

  console.log(e)

}

})

/*

BUTTON

*/

bot.on(
"callback_query",
async (q) => {

try {

  if (
    q.data === "ai"
  ) {

    await bot.answerCallbackQuery(
      q.id,
      {
        text:
        "gunakan /chat halo"
      }
    )

  }

  if (
    q.data === "img"
  ) {

    await bot.answerCallbackQuery(
      q.id,
      {
        text:
        "gunakan /img kucing lucu"
      }
    )

  }

  if (
    q.data === "tts"
  ) {

    await bot.answerCallbackQuery(
      q.id,
      {
        text:
        "gunakan /tts halo"
      }
    )

  }

  if (
    q.data === "close"
  ) {

    await bot.deleteMessage(
      q.message.chat.id,
      q.message.message_id
    )

  }

} catch (e) {

  console.log(e)

}

})

/*

ERROR

*/

process.on(
"uncaughtException",
console.log
)

process.on(
"unhandledRejection",
console.log
)
