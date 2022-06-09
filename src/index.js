const { Client, Intents: { FLAGS }} = require('discord.js')
const readline = require('readline-sync')
const fs = require('fs')

// Instancing client as scrapper and putting required intents
const scrapper = new Client({
   intents: [
      FLAGS.GUILDS,
      FLAGS.GUILD_MEMBERS,
   ]
})

/**
 * this is the main function which runs all program execution cuz it's a stupid script
 * @author Raskolnikov
 */
async function main() {
   const tag2Scrap = readline.question('Tag To Scrap: ').trim()
   const token = readline.question('Token Bot: ', { hideEchoBack: true }).trim()
   
   scrapper.once('ready', async () => {
      console.log(`Logged on as ${scrapper.user.tag}! :)`)
   
      const guild = scrapper.guilds.cache
         .find(g => g.roles.cache.find(r => r.id === tag2Scrap))

      if (guild) {
         await guild.members.fetch()
         const role = guild.roles.cache.get(tag2Scrap)

         const names = role.members.map(m => m.user.username.trim())
         fs.writeFileSync('./src/output/names.txt', names.join('\n'), { encoding: 'utf-8' })
         
         process.exit()
      }
   })

   await scrapper.login(token)
}

main()