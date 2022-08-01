const multer = require('multer');
var axios = require('axios');
var fs = require('fs');
var url = require("url");
var path = require("path");


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/images");
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    },
});
module.exports.upload = multer({ storage });

module.exports.uploadURL = async (_url) => {
    var parsed = url.parse(_url, true);
    try {
        const response = await axios.get(_url, { responseType: 'stream' });
        const w = response.data.pipe(fs.createWriteStream(`public/images/${path.basename(parsed.pathname)}`));
        w.on('finish', () => {
            return true;
        });
    } catch (error) {
        return false;
    }
} 
