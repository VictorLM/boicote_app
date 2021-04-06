const app = require('./app');
require('dotenv').config();

const port = process.env.APP_PORT || 3001;
app.listen(port);
