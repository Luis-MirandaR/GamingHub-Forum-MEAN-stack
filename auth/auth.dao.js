const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
    create: async function (data) {
        const user = new this(data);
        return await user.save();
    },
    login: async function (query) {
        return await this.findOne(query);
    }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;