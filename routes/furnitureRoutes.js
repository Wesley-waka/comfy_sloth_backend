const express = require('express');
const { createFurniture, updateFurniture } = require('../controllers/furnitureControllers');
const router = express.Router();

router.post('/', createFurniture);
router.patch('/:fid', updateFurniture);

module.exports = router;