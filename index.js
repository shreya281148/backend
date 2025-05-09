const express = require('express');
const bodyParser = require('body-parser');
const slotsRouter = require('./routes/slots');
const vehicleRouter = require('./routes/vehicle');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/slots', slotsRouter);
app.use('/api/vehicles', vehicleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
