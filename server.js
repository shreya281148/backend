const express = require('express');
const cors = require('cors');
require('dotenv').config();

const slotsRouter = require('./routes/slots');
const vehicleRouter = require('./routes/vehicle');
const cameraRouter = require('./routes/camera');
const sensorRouter = require('./routes/sensor');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/slots', slotsRouter);
app.use('/api/vehicle', vehicleRouter);
app.use('/api/camera', cameraRouter);
app.use('/api/sensor', sensorRouter);

app.get('/', (req, res) => {
  res.send('Parking Management System Backend is running.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
