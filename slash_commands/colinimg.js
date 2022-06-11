const fs = require("fs")
const path = require("path")
const buf = fs.readFileSync(path.resolve(__dirname, "./colinimg.txt"))
const text = Buffer.from(buf).toString().split("\n")

const { SlashCommandBuilder } = require("@discordjs/builders")
const command = new SlashCommandBuilder()
    .setName("colinimg")
    .setDescription("Displays some colin images!")

module.exports = {
    data: command,
    execute: async (client, interaction) => {
        await interaction.reply(text[Math.floor(Math.random() * text.length)])
    }
}