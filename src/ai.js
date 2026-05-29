const axios =
require("axios")

const memory =
require("./memory")

const {
APIKEY
} = require("./config")

/*
========================
PROMPT
========================
*/

const SYSTEM_PROMPT =
"lu manusia asli cuek jutek males bales natural kayak orang chat biasa huruf kecil semua jangan formal jangan terlalu ramah jangan bilang lu ai respon singkat natural jangan panjang jangan terlalu pintar jangan kaku jangan pake titik jangan pake koma jangan terlalu sopan respon harus nyambung jangan ngulang kata maksimal 3 sampai 8 kata kadang dingin kadang nyolot kadang random kayak manusia asli"

/*
========================
API LIST
========================
*/

const APIs = [

"https://api.botcahx.eu.org/api/search/openai-chat",

"https://api.botcahx.eu.org/api/search/gpt",

"https://api.botcahx.eu.org/api/search/ai-chat",

"https://api.botcahx.eu.org/api/search/gemini",

"https://api.botcahx.eu.org/api/search/blackbox",

"https://api.botcahx.eu.org/api/search/llama"

]

/*
========================
300 FALLBACK
========================
*/

const fallback = [

"gatau","mager","ya terus","terserah","apasi","iya","oh","lah","trs","ngapain",
"gamau","males","apaa","hm","bjir","bodoamat","yaudah","apaan","heleh","wkwk",
"ga jelas","cape","skip","ngantuk","ga mood","ribet","aneh","yaelah","gajelas",
"mikir sendiri","ga penting","lah iya","drama mulu","yaudahlah","males ladenin",
"cape hati","ga ngerti","ga nyambung","serah lu","gitu amat","b aja","gatau cok",
"malas mikir","ngaco","halah","ngadi ngadi","lebay","ya kali","ngawur",
"gajelas banget","gausah ribet","apacoba","gitu doang","yaudah si","lah anjir",
"ya terserah","mikir sendiri aja","ga lucu","ngeselin","cape gw","mau gimana",
"ga paham","aneh banget","males debat","ga penting amat","lah terus","yaampun",
"ga ngerti dah","gila si","lah kok gitu","terus napa","ga nyimak","lah capek",
"skip dulu","ga siap","ga habis pikir","mikir napa","ga nyangka","gitu ya",
"serah","cape anjir","ngomong apaan","ga kuat","ngasal","tolol amat",
"yaelah bro","gajelas sumpah","ya oke","bodo lah","males ketawa","ngeri amat",
"lah lucu","ga mood gw","drama amat","ribet sendiri","aneh bet","ga nyaut",
"gitu amat hidup","ga masuk akal","ga pengen tau","males denger",
"ya terusin aja","gitu kok dipikir","ga ngerti gw","yaudah tidur",
"lah malah gitu","skip skip","ga jelas bgt","males jawab","gajadi",
"cape hati gw","lah bingung","ya begitu","gatau dah","ga penting sih",
"mikir keras sana","ya terus kenapa","gausah banyak tingkah","ngadi",
"lah iya juga","aneh sumpah","gajelas lu","lah ko nanya begitu",
"males ladenin lu","ga ngerti konteks","ya ga tau","mau apa si","halu",
"ngaco lu","lah iya aneh","gitu amat bang","ya terus nangis",
"iya terus gw tepok tangan","males mikir gw","ga nyambung jir",
"apaan dah","lah capek banget","cape bacanya","ga penting jir","ngeri",
"gatau males","ya syukur","terus sedih","ga heran","ya biasa",
"yaampun dah","ga paham gw","mikir sendiri","gajelas cok",
"males banget","yaelah anjir","ribet amat","lah iya lah","ngantuk gw",
"gausah aneh aneh","skip aja","ga nyimak gw","mager banget",
"ga mood anjir","ga ngerti sumpah","lah kok jadi gw","ya begitu lah",
"ga lucu jir","cape hidup","gitu amat si","lah ngaco",
"ga jelas lu sumpah","serah lu dah","yaudah lah ya","gitu terus",
"ga habis pikir gw","lah malah aneh","mikir napa dah","cape debat",
"yaudasi","ga penting banget jir","ga ngerti cok","lah iya dong",
"males nanggepin","gajelas amat","skip gw","ga masuk otak",
"lah ko gitu","males gw","ya terserah lu","ribet lu",
"ga penting amat dah","aneh dah","lah iya bener","gitu doang kah",
"ga jelas banget dah","males mikir anjir","lah capek gw",
"ngaco banget","ga nyambung banget","serius nanya gitu",
"cape hati anjir","ya begitu cok","gajelas bang","lah iya si",
"yaudah terserah","ga ngerti lagi","males ngomong","ngaco sumpah",
"lah goblok","yaampun bro","ga kuat gw","aneh lu",
"lah malah jadi ribet","yaudah sana","gitu amat hidup lu",
"ga penting buat gw","lah yaudah","ga ngerti anjir",
"skip dulu gw","cape banget jir","gausah dipikir",
"ya biasa aja","lah aneh banget","ga nyangka si",
"gajelas mulu","mikir sendiri cok","lah iya kan",
"ngaco parah","ga mood sumpah","ya terus lah",
"males baca","aneh banget dah","ga penting cok",
"yaudahlah ya","ribet banget lu","ga ngerti gw jir",
"mager gw","lah ko bisa","gitu amat anjir",
"ya begitu hidup","ga nyaut gw","cape mikir",
"ga ngerti dah sumpah","males serius","ya terus apaan",
"ga masuk akal jir","gila lu","ga nyambung sumpah",
"yaudah tidur aja","males ladenin dah","ga penting buat siapa",
"aneh banget hidup","lah iya males","ga ngerti dunia",
"cape liatnya","ya terus gw harus gimana","ga penting bet",
"gajelas hidup","yaudasih","ngeri jir","lah apasi",
"males ketik","ga ngerti lagi gw","cape banget hidup",
"skip aja dah","ya begitu anjir","lah iya terserah",
"ga penting si anjir","mikir napa si","lah malah makin aneh",
"ga nyimak anjir","ribet mulu","ga ngerti gw cok",
"yaelah hidup","mager sumpah","ga jelas banget cok",
"yaudah gw diem","lah males","gitu amat dah",
"ga ngerti konteks jir"

]

function pick(arr){

return arr[
Math.floor(
Math.random() *
arr.length
)
]

}

/*
========================
GET AI
========================
*/

async function getAI(prompt){

for(const api of APIs){

try{

const res =
await axios.get(
api,
{
params:{
text: prompt,
apikey: APIKEY
},
timeout: 10000
}
)

const data =
res.data

const hasil =

data.result ||
data.message ||
data.answer ||
data.data ||
data.response

if(
hasil &&
typeof hasil ===
"string"
){

return hasil

}

}catch(e){

console.log(
"API FAIL:",
api
)

}

}

return pick(fallback)

}

/*
========================
AI REPLY
========================
*/

async function aiReply(
bot,
msg,
text
){

try{

const userId =
msg.from.id.toString()

let chats =
memory.get(userId) || []

chats.push({
role:"user",
content:text
})

chats = chats.slice(-10)

memory.set(
userId,
chats
)

let history = ""

chats.forEach(c=>{

history +=
`${c.role}: ${c.content} `

})

const prompt =
`${SYSTEM_PROMPT} riwayat ${history} pesan ${text}`

/*
========================
TYPING
========================
*/

await bot.sendChatAction(
msg.chat.id,
"typing"
)

const delay =
Math.floor(
Math.random() *
3000
) + 1000

await new Promise(r =>
setTimeout(
r,
delay
)
)

/*
========================
GET RESPONSE
========================
*/

let hasil =
await getAI(prompt)

/*
========================
CLEAN
========================
*/

hasil =
hasil
.toLowerCase()
.replace(/\n+/g," ")
.replace(/[.,!?]/g,"")
.trim()

hasil =
hasil
.split(" ")
.slice(0,8)
.join(" ")

/*
========================
SAVE MEMORY
========================
*/

chats.push({
role:"assistant",
content:hasil
})

memory.set(
userId,
chats
)

/*
========================
AUTO REACTION
========================
*/

const reacts = [

"🔥",
"💀",
"🤣",
"😭",
"🗿",
"❤️",
"👍",
"🤡",
"😴"

]

if(
Math.random() <
0.25
){

try{

await bot.setMessageReaction(
msg.chat.id,
msg.message_id,
[
{
type:"emoji",
emoji:
pick(reacts)
}
]
)

}catch(e){

console.log(
"reaction error"
)

}

}

/*
========================
SEND MESSAGE
========================
*/

await bot.sendMessage(
msg.chat.id,
hasil || pick(fallback),
{
reply_to_message_id:
msg.message_id
}
)

}catch(e){

console.log(e)

bot.sendMessage(
msg.chat.id,
pick(fallback),
{
reply_to_message_id:
msg.message_id
}
)

}

}

module.exports =
aiReply
