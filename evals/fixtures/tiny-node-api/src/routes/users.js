const express = require('express');
const asyncHandler = require('../lib/asyncHandler');

const router = express.Router();
const users = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
];

router.get('/', asyncHandler(async (req, res) => {
  res.json({ data: users });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'user not found' });
  res.json({ data: user });
}));

module.exports = router;
