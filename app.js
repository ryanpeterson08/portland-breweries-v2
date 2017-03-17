const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mapRoutes = require('./routes/map-routes.js');
const config = require('./config/database');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/map', mapRoutes);
app.get('/', (req, res) => {
  res.send('root');
})

app.listen(port, () => {
  console.log("Server started on port " + port);
  console.log("username " + config.userName);
})
