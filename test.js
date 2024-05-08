const { Client, Intents, MessageEmbed } = require('discord.js');
const token = 'MTIyOTE2NDk0ODgzNjQ1MDM3NA.GPg7ZM.anu59MAv40yw4yqLWJom7OUROAcvCrSxtCfiv0'; // Replace 'YOUR_BOT_TOKEN' with your actual bot token

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.once('ready', () => {
  console.log('Vouch Bot is online!');
});

// Command prefix
const prefix = '!';

client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'createvouch':
      // Create a new vouch
      const vouchContent = args.join(' ');
      const vouchEmbed = new MessageEmbed()
        .setTitle('New Vouch')
        .setDescription(vouchContent)
        .setColor('#00ff00')
        .setFooter('Vouch System', 'https://example.com/favicon.png');
      const vouchMessage = await message.channel.send({ embeds: [vouchEmbed] });
      // React with a checkmark to allow for confirmation
      await vouchMessage.react('✅');
      break;

    case 'deletevouch':
      // Delete a vouch by message ID
      const messageId = args[0];
      try {
        const vouchToDelete = await message.channel.messages.fetch(messageId);
        vouchToDelete.delete();
        message.channel.send('Vouch deleted successfully.');
      } catch (error) {
        console.error(error);
        message.channel.send('Failed to delete vouch.');
      }
      break;

    case 'updatevouch':
      // Update a vouch by message ID
      const updateId = args[0];
      const newContent = args.slice(1).join(' ');
      try {
        const vouchToUpdate = await message.channel.messages.fetch(updateId);
        const updatedEmbed = new MessageEmbed()
          .setTitle('Updated Vouch')
          .setDescription(newContent)
          .setColor('#ff0000')
          .setFooter('Vouch System Updated', 'https://example.com/favicon.png');
        vouchToUpdate.edit({ embeds: [updatedEmbed] });
        message.channel.send('Vouch updated successfully.');
      } catch (error) {
        console.error(error);
        message.channel.send('Failed to update vouch.');
      }
      break;
  }
});

client.login(token);