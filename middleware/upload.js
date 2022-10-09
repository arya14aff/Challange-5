const multer = require("multer");
const path = require('path');

const pubDir = path.join(__dirname, '../public');
const upDir = path.join(pubDir, 'images');

// const pubDir = path.join(__dirname, 'public');
// const upDir = path.join(pubDir, 'images');

// const storage = multer.diskStorage({
//     destination : function(req, file, callback){
//         callback(null, upDir);
//     },
//     filename : function(req, file, callback){
//         const uniqueIdentifier = Date.now() + '_' + Math.round(Math.random() * 1E9);
//         console.log(file);
//         callback(null, file.fieldname + '_' + uniqueIdentifier + path.extname(file.originalname));
//     }
// });

// const pubDir = `/public/images/${req.my_data.id}`;

    
const setup = multer.diskStorage({
    destination : function(req, file, callback){
           callback(null, upDir);
    },
    filename : function(req, file, callback){
        const uniqueIdentifier = Date.now() + '_' + Math.round(Math.random() * 1E9);
           console.log(file);
           callback(null, '_' + file.fieldname + '_' + uniqueIdentifier + path.extname(file.originalname));
     }
});

const upload = multer({storage: setup});

module.exports = {
    upload
}