import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';

/** start --- custom middlewares */
export { default as dtoValidationMiddleware } from './dto-validation.middleware';
export { default as authMiddleware } from './auth.middleware';
/** end --- */

import { logger, stream } from '@utils/index';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';

export { default as errorMiddleware } from './error.middleware';

const middlewares = [
  morgan(LOG_FORMAT as string, { stream }),
  cors({ origin: ORIGIN, credentials: CREDENTIALS }),
  hpp(),
  helmet(),
  compression(),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
];

export default middlewares;
