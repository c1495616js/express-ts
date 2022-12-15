import http from 'http';

import App from './app';
import { UserController } from '@/user';

const port = process.env.PORT != null ? Number(process.env.PORT) : 4000;
const { app } = new App([new UserController()], port);
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

export { app };
