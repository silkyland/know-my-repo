const express = require('express');
const asyncHandler = require('../lib/asyncHandler');

const router = express.Router();
const orders = [
  { id: 1, userId: 1, total: 42.5 },
  { id: 2, userId: 2, total: 17.0 },
];

router.get('/', asyncHandler(async (req, res) => {
  res.json({ data: orders });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'order not found' });
  res.json({ data: order });
}));

module.exports = router;
