import { CorsOptions } from 'cors';

const whitelist = ['https://www.google.com', 'http://localhost:3000', 'http://localhost:3001'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;