require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createTables } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await createTables();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

start();
