const {
  OWNER_ID
} = require("./config")

function isOwner(msg) {

  return (
    msg.from.id.toString() ==
    OWNER_ID
  )

}

module.exports = isOwner
