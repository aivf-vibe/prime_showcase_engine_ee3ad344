












const express = require('express');
const router = express.Router();
const { Blog, User } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { isPublished: true },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }],
      order: [['publishedAt', 'DESC']]
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog post
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }]
    });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog post (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      authorId: req.user.id
    };
    
    if (blogData.isPublished && !blogData.publishedAt) {
      blogData.publishedAt = new Date();
    }
    
    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    if (req.body.isPublished && !blog.publishedAt) {
      req.body.publishedAt = new Date();
    }
    
    await blog.update(req.body);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await blog.destroy();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;














