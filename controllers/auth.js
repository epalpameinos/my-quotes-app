
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

exports.getSignup = (request, response) => {
    if (request.user) {
        return response.redirect('/profile');
    }
    response.render('signup');
}

exports.postSignup = async (request, response) => {
    const validationErrors = [];
    if (!validator.isEmail(request.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (!validator.isLength(request.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
    if (request.body.password !== request.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

    if (validationErrors.length) {
        request.flash('errors', validationErrors);
        return response.redirect('../signup');
    }
    
    request.body.email = validator.normalizeEmail(request.body.email, { gmail_remove_dots: false });

    try {
        const user = new User({
            userName: request.body.userName,
            email: request.body.email,
            password: request.body.password
        });

        const saveUser = await User.findOne({$or: [
            {email: request.body.email},
            {userName: request.body.userName}
        ]});
    
        if (saveUser) {
            request.flash('errors', { msg: 'Account with that email address or username already exists.' });
            return response.redirect('../signup');
        }
        try {
            const saveAction = await user.save();
            request.logIn(user, (error) => {
                if (error) {
                    console.log(error);
                }
                response.redirect('/profile');
            });
        } catch (error) {
            console.log(error);
        }      
    } catch (error) {
        console.log(error);       
    }
}

exports.getLogin = (request, response) => {
    if (request.user) {
        return response.redirect('/profile');
    }
    response.render('login');
}

exports.postLogin = (request, response, next) => {
    const validationErrors = [];
    if (!validator.isEmail(request.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (validator.isEmpty(request.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
  
    if (validationErrors.length) {
        request.flash('errors', validationErrors);
        return response.redirect('/login');
    }
    request.body.email = validator.normalizeEmail(request.body.email, { gmail_remove_dots: false });
  
    passport.authenticate('local', (error, user, info) => {
        if (error) { return next(error) }
        if (!user) {
            request.flash('errors', info);
            return response.redirect('/login');
        }
        request.logIn(user, (error) => {
            if (error) { return next(error) }
            request.flash('success', { msg: 'Success! You are logged in.' });
            response.redirect(request.session.returnTo || '/profile');
        });
    })(request, response, next);
}

exports.logout = (request, response) => {
    request.logout(() => {
        console.log('User has logged out..');
    });
    request.session.destroy((error) => {
        if (error) console.log('Error : Failed to destroy the session during logout.', error);
        request.user = null;
        response.redirect('/');
    });
}