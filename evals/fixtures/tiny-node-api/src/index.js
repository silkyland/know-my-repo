const express = require('express');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on ${port}`));
}

module.exports = app;
