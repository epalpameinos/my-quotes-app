
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        let user;
        try {
            user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                return done(null, false, { msg: `Email ${email} not found.` });
            }
            if (!user.password) {
                return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
            }
        } catch (error) {
            return done(error);  
        }
        let isMatch = await user.comparePassword(password);
        if (isMatch) {
            return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });  
    }));
      
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    });
    
}