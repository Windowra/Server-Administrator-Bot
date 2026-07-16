const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member from the server.")
        .addUserOption(option =>
            option
                .setName("member")
                .setDescription("The member to kick")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the kick")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {

        const target = interaction.options.getMember("member");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if (!target) {
            return interaction.reply({
                content: "❌ I couldn't find that member.",
                ephemeral: true
            });
        }

        if (target.id === interaction.user.id) {
            return interaction.reply({
                content: "❌ You can't kick yourself.",
                ephemeral: true
            });
        }

        if (!target.kickable) {
            return interaction.reply({
                content: "❌ I can't kick this member. They may have a higher role than me.",
                ephemeral: true
            });
        }

        await target.kick(reason);

        const embed = new EmbedBuilder()
            .setColor(0xED4245)
            .setTitle("👢 Member Kicked")
            .addFields(
                {
                    name: "Member",
                    value: `${target.user.tag}`,
                    inline: true
                },
                {
                    name: "Moderator",
                    value: `${interaction.user.tag}`,
                    inline: true
                },
                {
                    name: "Reason",
                    value: reason
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};