















const express = require('express');
const router = express.Router();
const { Career } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all active career listings
router.get('/', async (req, res) => {
  try {
    const careers = await Career.findAll({ where: { isActive: true } });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single career listing
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career listing not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create career listing (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update career listing (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career listing not found' });
    }
    await career.update(req.body);
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete career listing (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career listing not found' });
    }
    await career.destroy();
    res.json({ message: 'Career listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

















