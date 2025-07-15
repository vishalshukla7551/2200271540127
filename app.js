const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const shortURLRoutes = require('./routes/shorturl');

app.use(express.json());
app.use(logger); 
app.use(shortURLRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
