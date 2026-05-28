module.exports =
async function(
  bot,
  msg
) {

  if (!msg.text)
    return false

  const text =
    msg.text

  /*
  FILTER COMMAND
  */

  if (
    text.startsWith("/")
  ) return false

  /*
  SEMUA CHAT
  DIBALAS
  */

  return true

}
