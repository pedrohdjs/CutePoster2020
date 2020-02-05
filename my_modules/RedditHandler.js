const Snoowrap = require('snoowrap');

//Used for filtering the media URLs, getting only .jpg images from reddit or imgur.
function isDesiredURL(str){
    return ((str.includes("i.imgur") || str.includes("i.redd.it")) && !str.includes("gif")) && !str.includes("png");
};

//This class uses Snoowrap in order to get image URLs from subreddits.
class RedditHandler {

    constructor(credentials,subredditScreenNames){
        this.wrapper = new Snoowrap(credentials);
        this.subreddits = subredditScreenNames;//A subreddit screen name array
    };

    /* This functions gets the 100 top posts from each subreddit in the subreddit array and returns all the 
    image URLs from these posts.*/
    async getTopImagesURLs (){

        let res = []; //Initializes res as an array in which URL strings are going to be stored

        for (let sub of this.subreddits) { 
            try{
                let subReddit = await this.wrapper.getSubreddit(sub);
                let posts = await subReddit.getTop({limit: 20});//Gets up to 20 posts
                let urls = (posts.map(post => post.url)).filter(isDesiredURL);//Filtering to avoid GIFs and videos.
                res = res.concat(urls);
            } catch (ex){
                console.log(ex);
            }
        };

        return res;
    };

};

module.exports = RedditHandler;