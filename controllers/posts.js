
const Post = require('../models/Post');

module.exports = {
    getProfile: async (request, response) => {
        try {
          const posts = await Post.find({ user: request.user.id });
          response.render("profile.ejs", { posts: posts, user: request.user });
        } catch (error) {
            console.log(error);
        }
    },
    createPost: async (request, response) => {
        try {
            await Post.create({
                quote: request.body.quoteText, 
                author: request.body.quoteAuthor,
                likes: 0,
                user: request.user.id,
            });
            console.log('Post has been added!');
            response.redirect('/profile');
        } catch(error) {
            console.log(error);
        }
    },
    getPost: async (request, response) => {
        try {
          const post = await Post.findById(request.params.id).populate('user');
          response.render("post.ejs", { post: post, user: request.user });
        } catch (error) {
            console.log(error);
        }
    },
    deletePost: async (request, response) => {
        try {
            /* let post = await Post.findById({ _id: request.params.id });
            console.log(post); */
            // delete post from db
            await Post.deleteOne({ _id: request.params.id });
            console.log("Post Deleted");
            response.redirect("/profile");
        } catch (error) {
            console.log(error);
        }
    },
    likePost: async (request, response) => {
        try {
            await Post.findOneAndUpdate(
                { _id: request.params.id },
                { $inc: { likes: 1 } }
            );
            console.log("Likes +1");
            response.redirect(`/post/${request.params.id}`);
        } catch (error) {
            console.log(error);
        }
    },
    getFeed: async (request, response) => {
        try {
            // const posts = await Post.find().sort({ createdAt: "desc" }).lean().populate('user');
            const posts = await Post.find().sort({ createdAt: "desc" }).lean().populate('user');
            response.render("feed.ejs", { posts: posts });
        } catch (error) {
            console.log(error);
        }
    },
    /* getQuotes: async (request, response) => {
        try {
            const quoteItems = await Quote.find();
            response.render('quotes.ejs', {quotes: quoteItems});
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
    } */
};