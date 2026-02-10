const express = require('express');
const HealthController = require('../controllers/healthController');

const router = express.Router();

/**
 * GET /health
 * Health check endpoint
 */
router.get('/health', HealthController.check);

module.exports = router;
