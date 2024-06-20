import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'public/uploads')
    },
    filename: function(req,file,callback){
        callback(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
console.log('Se subio la imagen');
export default upload;