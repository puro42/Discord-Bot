const fs = require("fs")
const path = require("path")
const buf = fs.readFileSync(path.resolve(__dirname, "./squogimg.txt"))
const text = Buffer.from(buf).toString().split("\n")

const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("squogimg")
    .setDescription("Displays some squog images I HATE U SQUOGS!!")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        await interaction.reply(text[Math.floor(Math.random() * text.length)])
    }
}