const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const port = 5000;

app.use(cors());
app.use('/imageupload',express.static('./images'));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'images/')
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname+path.extname(file.originalname));
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload = multer({ storage: storage,fileFilter,fileFilter });
app.post('/imageupload', upload.single('uploadImg'), function (req, res) {
   if(req.file){
    res.json({message:'file uploaded'});
   }
    
  })
  

app.listen(port,() =>console.log('server running...'))