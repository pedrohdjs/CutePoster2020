const download = require('image-downloader');
const fs = require('fs');

class ImageHandler {

    async download(url){ //Downloads an image from an url

        const options = {
            url: url,
            dest: __dirname + '\\img.jpg' //image.jpg will be replaced at every download
        };

        let res = await download.image(options)
        if(res.err) //Returns null if the image URL is broken and the download fails
            return null;
        else 
            return res.filename;

    }

    getBase64(filename){ //Reads an image an returns it's content encoded in base64
        const b64content = fs.readFileSync(filename, { encoding: 'base64' });
        return b64content;     
    };

}

module.exports = ImageHandler;