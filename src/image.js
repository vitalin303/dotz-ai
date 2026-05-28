const {
  APIKEY
} = require("./config")

async function imageReply(
  bot,
  msg,
  prompt
) {

  const image =
`https://api.botcahx.eu.org/api/ai/txt2img?prompt=${encodeURIComponent(prompt)}&apikey=${APIKEY}`

  bot.sendPhoto(
    msg.chat.id,
    image,
    {
      caption:
`🎨 Prompt:
${prompt}`
    }
  )

}

module.exports =
imageReply
