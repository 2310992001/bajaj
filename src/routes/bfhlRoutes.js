const express = require('express');
const BFHLController = require('../controllers/bfhlController');
const requestValidator = require('../middleware/requestValidator');

const router = express.Router();

/**
 * POST /bfhl
 * Main API endpoint
 * Handles: fibonacci, prime, lcm, hcf, AI operations
 */
router.post('/bfhl', requestValidator, BFHLController.handleRequest);

module.exports = router;
