const {
  APIKEY
} = require("./config")

async function ttsReply(
  bot,
  msg,
 text
) {

  const audio =
`https://api.botcahx.eu.org/api/tools/tts?text=${encodeURIComponent(text)}&apikey=${APIKEY}`

  bot.sendVoice(
    msg.chat.id,
    audio
  )

}

module.exports =
ttsReply
