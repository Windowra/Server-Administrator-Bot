const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete a number of messages.")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Number of messages to delete (1-100)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {

        const amount = interaction.options.getInteger("amount");

        await interaction.channel.bulkDelete(amount, true);

        const embed = new EmbedBuilder()
            .setColor(0x57F287) // Green
            .setTitle("🧹 Messages Cleared")
            .setDescription(`Successfully deleted **${amount}** messages.`)
            .addFields(
                {
                    name: "Moderator",
                    value: `${interaction.user}`,
                    inline: true
                },
                {
                    name: "Channel",
                    value: `${interaction.channel}`,
                    inline: true
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

    }
};