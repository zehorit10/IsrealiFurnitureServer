const fs = require('fs');
const rsa = require('node-rsa');
const cryptoJS = require('crypto-js');

exports.myDecrypt = (cipher) => {
    let private = fs.readFileSync('./keys/private.pem', 'utf8');
    let text = cryptoJS.AES.decrypt(cipher, private);
    return text.toString(cryptoJS.enc.Utf8);
}


function generatePair() {
    let key = new rsa().generateKeyPair();
    let privateKey = key.exportKey('private');
    fs.openSync('./keys/private.pem', 'w');
    fs.writeFileSync('./keys/private.pem', privateKey, 'utf8');
}
//generatePair();
