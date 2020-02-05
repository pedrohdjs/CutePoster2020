const Twit = require('twit');

//This class uses Twit to post images to twitter
class TwitterHandler {
    
    constructor(credentials){
        this.wrapper = new Twit(credentials);
    };

    async postImage(b64image){
        let image_upload = await this.wrapper.post('media/upload',{ media_data: b64image }); //Uploading the image
        const id = image_upload.data.media_id_string; //Getting it's ID
        let res = await this.wrapper.post('statuses/update', { status: '', media_ids: [id] }); //Posting the image
    };

};

module.exports = TwitterHandler;