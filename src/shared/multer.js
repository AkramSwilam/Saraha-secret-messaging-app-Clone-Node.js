import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs"
export const allFormats = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    file: ['application/pdf', 'application/docx', 'application/txt']
}
export const multerFunctionUploader = (path, formats) => {
    if (!fs.existsSync(`uploads/${path}`)) {
        fs.mkdirSync(`uploads/${path}`, { recursive: true })
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${path}`)
        },
        filename: function (req, file, cb) {

            console.log(file);
            const fileName = nanoid() + "_" + file.originalname
            file.finalDest = `uploads/${path}/${fileName}`
            cb(null, fileName)
        }
    })
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




