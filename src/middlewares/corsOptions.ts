import cors from 'cors';

// CHANGE HERE
const allowedOrigins = [
  'http://suloxidos-production.s3-website-us-west-2.amazonaws.com',
  'http://suloxidos-sandbox.s3-website-us-west-2.amazonaws.com',
  'http://suloxidos-lab-sandbox.s3-website-us-west-2.amazonaws.com',
  'http://suloxidos-lab-production.s3-website-us-west-2.amazonaws.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
