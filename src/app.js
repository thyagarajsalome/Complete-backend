const express =  require('express');
const multer = require('multer');
const uploadFile = require('./services/stroage.service');
const PostModel = require('./models/post.model');

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });




app.post('/create-post', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const result = await uploadFile(req.file.buffer);
   
app.get ("/posts", async (req, res) => {
    const posts = await PostModel.find();
    return res.status(200).json({
        success: true,
        posts
    })
    
})

   
});



module.exports = app;