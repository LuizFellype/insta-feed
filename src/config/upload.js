const multer = require('multer')
const path = require('path')

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, cb) {
            const [fileName] = file.originalname.split('.')
            cb(null, fileName + '-' + Date.now() + '.jpeg')
        }
    }),

}
