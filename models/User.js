
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});

// password hash middleware
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (error, salt) => {
        if (error) { return next(error) }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) { return next(error) }
            user.password = hash;
            next();
        });
    });
});

// helper method for validating user's password

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        cb(error, isMatch);
    });
}


module.exports = mongoose.model('User', UserSchema);