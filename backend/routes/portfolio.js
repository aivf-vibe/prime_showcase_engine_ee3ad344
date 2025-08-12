
















const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({
      order: [['completionDate', 'DESC']]
    });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured portfolio items
router.get('/featured', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({
      where: { isFeatured: true },
      order: [['completionDate', 'DESC']]
    });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create portfolio item (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio item (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    await portfolio.update(req.body);
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    await portfolio.destroy();
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


















