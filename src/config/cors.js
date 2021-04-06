require('dotenv').config();

let whiteList = [];

if (process.env.NODE_ENV === 'production') {
  whiteList = [
    'http://boicote.app',
    'https://boicote.app',
    'http://www.boicote.app',
    'https://www.boicote.app',
  ];
} else if (process.env.NODE_ENV === 'development') {
  whiteList = [
    'http://localhost.local:3000',
    'http://localhost:3000',
    'http://localhost',
  ];
}

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
