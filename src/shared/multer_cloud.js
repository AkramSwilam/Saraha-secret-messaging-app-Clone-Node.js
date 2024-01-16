import multer from "multer";

export const allFormats = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    file: ['application/pdf', 'application/docx', 'application/txt']
}
export const multerCloudUploader = ( formats) => {
    
    const storage = multer.diskStorage({})
    
    function fileFilter(req, file, cb) {
        if (formats.includes(file.mimetype)) {
            cb(null, true)
        }

        else {
            cb(new Error('Invalid format', { cause: 400 }))
        }

    }


    return multer({ storage, fileFilter }) 
}




