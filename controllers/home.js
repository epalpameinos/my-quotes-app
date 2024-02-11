
const Quote = require('../models/Quote');

module.exports = {
    getQuotes: async (request, response) => {
        try {
            const quoteItems = await Quote.find();
            response.render('quotes.ejs', {quotes: quoteItems});
        } catch(error) {
            console.log(error);
        }
    }
};