const express = require('express');
const { createFurniture, updateFurniture, getAllFurniture, findFurniture } = require('../controllers/furnitureControllers');
const router = express.Router();

router.get('/', getAllFurniture);
router.get('/:fid', findFurniture);
router.post('/', createFurniture);
router.patch('/:fid', updateFurniture);

module.exports = router;