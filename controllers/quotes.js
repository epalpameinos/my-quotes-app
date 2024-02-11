
const Quote = require('../models/Quote');


module.exports = {
    createQuote: async (request, response) => {
        try {
            await Quote.create({quote: request.body.quoteText, author: request.body.quoteAuthor});
            console.log('Quote has been added!!');
            response.redirect('/quotes');
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