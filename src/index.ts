import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT ?? 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('The server is working!');
});

app.listen(port, () => {
  console.log(`listening on port ${port} !!!`);
});
