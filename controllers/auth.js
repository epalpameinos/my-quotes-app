
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

exports.getSignup = (request, response) => {
    if (request.user) {
        return response.redirect('/quotes');
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
                response.redirect('/quotes');
            });
        } catch (error) {
            console.log(error);
        }      
    } catch (error) {
        console.log(error);       
    }

    /* User.findOne({$or: [
        {email: request.body.email},
        {userName: request.body.userName}
      ]}, (error, existingUser) => {
        if (error) { return next(error) }
        if (existingUser) {
            request.flash('errors', { msg: 'Account with that email address or username already exists.' });
            return response.redirect('../signup');
        }
        user.save((error) => {
            if (error) { return next(error) }
            request.logIn(user, (error) => {
                if (error) {
                    return next(error);
                }
                response.redirect('/quotes');
            });
        });
    }); */

}