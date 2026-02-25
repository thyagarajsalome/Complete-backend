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
   

    const post =  await PostModel.create({
        image: result.url,
        caption: req.body.caption
    })

   res.status(201).json({
    message: "Post created successfully",
    post
   })
});



module.exports = app;