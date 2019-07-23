import * as express from 'express';
import * as BodyParser from 'body-parser';

import env from './environment';
import router from './routes/web';
import DB from './database/database';

import { ErrorsController } from './controllers/errors-controller';

DB.getConnection((err, connection) => {
  if (err) {
    console.log('DB cannot to connect', err);
  }
  else {
    connection.execute('show tables', (err, result) => {
      console.log(result);
    })
  }
})

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