const express =require('express')
const {connectToMongoDB} =require("./connection")

require('dotenv').config();
// db
const MONGO_URI = process.env.MONGO_URI 

//connection
connectToMongoDB(MONGO_URI).then(()=> console.log("Mongodb connect"));

const app = express();
app.use(express.json());

//routes
const urlRoutes = require("./routes/url");
app.use("/", urlRoutes);

// Start Server

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const TOKEN = process.env.TOKEN
const {Client, GatewayIntentBits}=require ("discord.js")
const client = new Client({ intents: 
    [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    ],
});
/*
client.on('messageCreate', (message) =>{
    if(message.author.bot) return;
    message.reply({
        content:"Hi from Bot",
    })
        */
    const Url = require("./models/Url");
const shortid = require("shortid");

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("create ")) {
        const url = message.content.split("create ")[1]?.trim();

        if (!url) {
            return message.reply("⚠️ Please provide a valid URL.");
        }

        const shortId = shortid.generate();
        const newUrl = new Url({ originalUrl: url, shortId });

        await newUrl.save();
        return message.reply(`🔗 Shortened URL: http://localhost:5000/${shortId}`);
    }
    message.reply({
        content:"Hi from Bot",
         })
});


client.on("interactionCreate",(interaction)=>{
    interaction.reply("Pong!!")
})

client.login(
    TOKEN
)

