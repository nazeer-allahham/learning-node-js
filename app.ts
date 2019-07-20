import * as express from 'express';
import * as BodyParser from 'body-parser';

import router from './routes/web';
import env from './environment';
import { ErrorsController } from './controllers/errors-controller';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(BodyParser.urlencoded({ extended: false }));

// Static files route
app.use(express.static(env.public));

// Modules routes
app.use(router);

// Errors routes
app.use(ErrorsController.pageNotFound404);

app.listen(env.port,  env.hostName, () => {
  console.log('listening on ', `http://${env.hostName}:${env.port}`);
  console.log('we are learning NodeJs');
  
});