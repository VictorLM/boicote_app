const whiteList = [
  'http://localhost:3000', // TODO
  'http://boicote.app',
  'https://boicote.app',
  'http://www.boicote.app',
  'https://www.boicote.app',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOptions;
