
const express = require('express');
const EventController = require('../controllers/eventController');
const TokenUtil = require('../utils/tokenUtil');

const router = express.Router();
const eventController = new EventController();

router.post('/', (req, res) => eventController.createEvent(req, res));
router.get('/', TokenUtil.authenticateToken, (req, res) => eventController.getEvents(req, res));
router.get('/:id', TokenUtil.authenticateToken, (req, res) => eventController.getEventsById(req, res));
router.delete('/:id',TokenUtil.authenticateToken, (req, res) => eventController.deleteEvent(req, res));
router.put('/:id', (req, res) => eventController.updateEvent(req, res));

module.exports = router;
