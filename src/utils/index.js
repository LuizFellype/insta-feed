module.exports = {
    getPublicIdFromUrl: (url) => {
        const splited = url.split('/')
        const publicIdAndFormat = splited[splited.length - 1].split('.')
        const publicId = publicIdAndFormat[0]
        return publicId 
    }
}