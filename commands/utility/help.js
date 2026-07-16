const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("View all available commands."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle("🛡️ Server Administrator Bot")
            .setDescription("Here are the available commands.")
            .addFields(
                {
                    name: "🛠 Utility",
                    value:
                        "`/ping` - Check if the bot is online.\n" +
                        "`/help` - Show this help menu."
                },
                {
                    name: "🛡 Moderation",
                    value:
                        "`/clear` - Delete messages.\n" +
                        "`/kick` - Kick a member.\n" +
                        "`/ban` - Ban a member."
                }
            )
            .setFooter({
                text: "Server Administrator Bot"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};