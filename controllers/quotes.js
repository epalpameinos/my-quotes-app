
const Quote = require('../models/Quote');

module.exports = {
    getProfile: async (request, response) => {
        try {
          const quotes = await Quote.find({ user: request.user.id });
          response.render("profile.ejs", { quotes: quotes, user: request.user });
        } catch (error) {
            console.log(error);
        }
    },
    getFeed: async (request, response) => {
        try {
          const quotes = await Quote.find().sort({ createdAt: "desc" }).lean().populate('user');
          response.render("feed.ejs", { quotes: quotes });
        } catch (error) {
            console.log(error);
        }
    },
    getQuotes: async (request, response) => {
        try {
            const quoteItems = await Quote.find();
            response.render('quotes.ejs', {quotes: quoteItems});
        } catch(error) {
            console.log(error);
        }
    },
    createQuote: async (request, response) => {
        try {
            await Quote.create({
                quote: request.body.quoteText, 
                author: request.body.quoteAuthor,
                likes: 0,
                user: request.user.id,
            });
            console.log('Quote has been added!!');
            response.redirect('/profile');
            // response.redirect('/quotes');
        } catch(error) {
            console.log(error);
        }
    },
    makeOrange: async (request, response) => {
        try {
            await Quote.findOneAndUpdate({_id:request.body.quoteIdFromJSFile}, {
                isOrange: true
            });
            console.log('Marked Orange');
            response.json('Marked Orange');
        } catch(error) {
            console.log(error);
        }
    },
    makeGreen: async (request, response) => {
        try {
            await Quote.findOneAndUpdate({_id:request.body.quoteIdFromJSFile}, {
                isOrange: false
            });
            console.log('Marked Green');
            response.json('Marked Green');
        } catch(error) {
            console.log(error);
        }
    },
    deleteQuote: async (request, response) => {
        console.log(request.body.quoteIdFromJSFile);
        try {
            await Quote.findOneAndDelete({_id: request.body.quoteIdFromJSFile});
            console.log('Deleted Quote');
            response.json('Deleted It');
        } catch(error) {
            console.log(error);
        }
    }
};