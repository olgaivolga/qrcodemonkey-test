import { Decoder } from '@nuintun/qrcode';
const qrcode = new Decoder();

module.exports.decode = function decode(image) {
    return qrcode.scan(image).then(result => {
        console.log(result);
        return result.data;
    }) 
}

  