const { BitField } = require('discord.js')

module.exports.MANAGE_GUILD = async (bitfield_arg) => {
    const bitfield = new BitField(bitfield_arg)
    return bitfield.has(32)
}
