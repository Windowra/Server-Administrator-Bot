const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member from the server.")
        .addUserOption(option =>
            option
                .setName("member")
                .setDescription("The member to ban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the ban")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {

        const target = interaction.options.getMember("member");
        const user = interaction.options.getUser("member");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if (!target) {
            return interaction.reply({
                content: "❌ I couldn't find that member in this server.",
                ephemeral: true
            });
        }

        if (target.id === interaction.user.id) {
            return interaction.reply({
                content: "❌ You can't ban yourself.",
                ephemeral: true
            });
        }

        if (!target.bannable) {
            return interaction.reply({
                content: "❌ I can't ban this member. They may have a higher role than me.",
                ephemeral: true
            });
        }

        await target.ban({ reason });

        const embed = new EmbedBuilder()
            .setColor(0xED4245)
            .setTitle("🔨 Member Banned")
            .addFields(
                {
                    name: "Member",
                    value: user.tag,
                    inline: true
                },
                {
                    name: "Moderator",
                    value: interaction.user.tag,
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