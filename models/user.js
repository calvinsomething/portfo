const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    external_id: {
        type: String,
        required: true
    },
    photo: String
});

userSchema.statics.findOrCreate = async function(profile, cb) {
    let user;
    try {
        user = await this.findOne({ external_id: profile.id });
        if (!user) {
            console.log('user is NULLLL');
            user = await this.create({
            name: profile.name.givenName,
            external_id: profile.id,
            photo: profile._json.picture
            });
        }
        cb(null, user.id);
    } catch(err) {
        cb(err, null);
    }
};

const User = mongoose.model('user', userSchema);

module.exports = User;