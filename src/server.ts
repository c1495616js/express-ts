import http from 'http';

import App from './app';
import { UserController } from '@/services/user';
import middlewares from '@middlewares/index';
import { logger } from '@utils/logger';
import database from '@/db';

const port = process.env.PORT != null ? Number(process.env.PORT) : 4000;
const appInstance = new App({ controllers: [new UserController()], middlewares, port, database });

const server = http.createServer(appInstance.app);

server.listen(appInstance.port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${appInstance.env} =======`);
  logger.info(`🚀 App listening on the port ${appInstance.port}`);
  logger.info(`=================================`);
});

export { appInstance };
