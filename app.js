import { TOKEN, CLIENT_ID, GUILD_ID} from "./var.js"
const { REST, Routes, Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var guild = undefined
const commands = [
    new SlashCommandBuilder().setName('colour-me-surprised').setDescription('Colours you in hex role!').addStringOption(option =>
		option.setName('colour-me')
			.setDescription('Add the colour to the role you want')
			.setRequired(true))
]
    .map(command => command.toJSON());
  
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  
  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  guild = client.guilds.cache.get(GUILD_ID);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'colour-me-surprised') {
    const colour=interaction.options.getString('colour-me')
    if(validate(colour)){
        const member1 = await interaction.guild.members.fetch(interaction.user.id);
        const role = interaction.guild.roles.cache.find(r => r.name === interaction.user.username);
        if (role != null || undefined){
            await interaction.reply({ content: 'Updated', ephemeral: true });
            role.edit({color: colour})
        }else{
            await guild.roles.create({
                name: interaction.user.username,
                color: colour.toString(),
                position: 1
              }).then((role) => {
                member1.roles.add(role.id)//a bit of a hack to await for just the role assuming the member resolves first
            });
            await interaction.reply({ content: 'Enjoy your new role', ephemeral: true });
        }
    }else{
        console.log("invalid colour... ", colour)
        await interaction.reply({ content: 'There was an colour error while executing this command did you input it as hex?!', ephemeral: true });
    }}})

function validate(param){
    const regex = /^#(?:[0-9a-f]{3}){1,2}$/i;
    return regex.test(param);
  }

client.login(TOKEN);