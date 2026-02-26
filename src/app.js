const express =  require('express');
const multer = require('multer');
const uploadFile = require('./services/stroage.service');
const PostModel = require('./models/post.model');

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// POST: Create a new post
app.post('/create-post', upload.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image provided" });
        }

        // Upload to ImageKit
        const result = await uploadFile(req.file.buffer);
       
        // Save to Database
        const newPost = await PostModel.create({
            image: result.url, // Save the ImageKit URL
            caption: req.body.caption || ''
        });

        return res.status(201).json({
            success: true,
            post: newPost
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// GET: Fetch all posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await PostModel.find();
        return res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = app;