






const express = require('express');
const router = express.Router();
const { Service } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll({ where: { isActive: true } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create service (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update service (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.update(req.body);
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;








