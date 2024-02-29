
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
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

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    try {
        let verify_password = await bcrypt.compare(candidatePassword, this.password);
        if (verify_password) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);    
    }
}


module.exports = mongoose.model('User', UserSchema);