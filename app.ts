import * as express from 'express';
import jwtRouter from './src/routes/jwt.routes';



let app = express();
app.use('/jwt',jwtRouter);

export default app;

