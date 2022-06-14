const fs = require("fs")
const dotenv = require("dotenv")
const Discord = require("discord.js")
const { ReactionRole } = require("discordjs-reaction-role")
const config = require("./config.json")

// Load env variables
//const dotenvResult  = dotenv.config()
//if(dotenvResult.error) throw dotenvResult.error

// Create client & set intents
const myIntents = new Discord.Intents()
myIntents.add("GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGE_REACTIONS")

const client = new Discord.Client({ intents: myIntents })
client.slashCommands = new Discord.Collection()
const slashCommandFiles = fs.readdirSync("./slash_commands").filter(file => file.endsWith(".js"))

for(const file of slashCommandFiles) {
    const slashCommand = require(`./slash_commands/${file}`)
    client.slashCommands.set(slashCommand.data.name, slashCommand)
}

// Client ready
client.once("ready", async () => {
    console.log(`Ready! We are in as ${client.user.username}`)
    client.user.setActivity("with Hooman! :D Or turning it >:D")
})

// Keep alive code
require("./keep_alive")()

const rr = new ReactionRole(client, config.reactionRoles)

// Hardcoded events
client.on("guildCreate", guild => {
	console.log(`Joined guild ${guild.name} (${guild.id})`)
	client.slashCommands.forEach(async (command) => {
		client.guilds.cache.get(guild.id)?.commands.create(command.data)
			.catch(e => {
				console.error(`Couldn't create slash command in guild ${guild.name} (${guild.id})\n${e}`)
			})
	})
})

// Message event
const path = require("path")
const buf = fs.readFileSync(path.resolve(__dirname, "./responses.txt"))
const text = Buffer.from(buf).toString().split("\n")

const usersMap = new Map();
const LIMIT = config.antispam.limit;
const DIFF = config.antispam.diff;
const TIME = 10000
client.on("messageCreate", async (message) => {
    if(message.author.bot) return
    if(message.channel.type !== "GUILD_TEXT") return
    if(message.content.startsWith(`<@${client.user.id}>`)) message.reply(text[Math.floor(Math.random() * text.length)])

    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                const member = await message.guild.members.cache.get(message.author.id)
                if(!member) return
                member.timeout(config.antispam.muteTime, `Spam in #${message.channel.name}`).catch(console.error)
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})

// Welcome message
client.on("guildMemberAdd", async (member) => {
    if(member.guild.id !== config.guildId) return
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setDescription(`Hello ${member.user.tag} to the server!\nWe are happy to have you here and we will give you a nice warm and snuggly welcome!\nCheck out the server channels and have a great time!\nWe hope you have a great time at our server!`)
        .setFooter({ text: `${guild.name} | ID: ${guild.id}`, iconURL: guildIcon })
        .setTimestamp()
    
    const channel = await client.channels.cache.get(config.channelId)
    if(!channel) return
    channel.send({ embeds: [embed] })
})

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return
    const command = interaction.commandName
    if(!client.slashCommands.has(command)) return /*await interaction.reply({ content: `${config.emojis.no} There is no such command`, ephemeral: true })*/
    try {
        client.slashCommands.get(command).execute(client, interaction)
    } catch(error) {
        console.error(error)
        interaction.reply({ content: `${config.emojis.no} There was an error while executing that command`, ephemeral: true })
    }
})

client.login(process.env.TOKEN)