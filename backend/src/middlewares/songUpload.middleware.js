const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});

async function uploadFile({ buffer, fileName, folder = 'modify/songs' }) {
    const res = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer), 'file'),
        fileName,
        folder
    });

    return res;
}

module.exports = { uploadFile }