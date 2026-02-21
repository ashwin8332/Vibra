const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Load posts data
const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
let posts = [];

try {
  const postsData = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
  posts = postsData.posts || [];
  console.log(`Loaded ${posts.length} posts from data file`);
} catch (error) {
  console.error('Error loading posts:', error);
}

router.get('/', (req, res) => {
  res.render('home', { 
    title: 'Home - Vibra',
    posts: posts
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About - Vibra' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact - Vibra' });
});

module.exports = router;
