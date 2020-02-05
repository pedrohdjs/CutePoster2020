const fs = require('fs')
const RedditHandler = require('./my_modules/RedditHandler')
const TwitterHandler = require('./my_modules/TwitterHandler')
const ImageHandler = require('./my_modules/ImageHandler')
const rand = require('./my_modules/rand')
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json')) //config.JSON stores twitter and reddit credentials

const redditHandler = new RedditHandler(config.reddit,config.subreddits);
const twitterHandler = new TwitterHandler(config.twitter);
const imageHandler = new ImageHandler();
var imageUrls = [];

async function init () { //Starts the bot by getting the image URLs, posting an image and scheduling image posts to every hour
  imageUrls = await redditHandler.getTopImagesURLs();
  await action();
  setInterval(action,1000*60*60);
}

function getRandomImageUrl(){
  const image = rand(imageUrls);
  imageUrls = imageUrls.filter(el => el !== image); //Removes the URL from the imageUrls array in order to prevent reposts
  return image;
}

async function action () { //Gets an image URL stored in imageUrls, downloads the image and then posts it to twitter
  let image = null
  let url = getRandomImageUrl();
  while (image === null){ //ImageHandler.download returns null if any error occurs
    url = getRandomImageUrl();
    image = await imageHandler.download(url);
  }
  const b64 = imageHandler.getBase64(image);
  await twitterHandler.postImage(b64);
}

init();//Calls init once the bot starts (The bot is restarted every 24 hours in order to get new image URLs)