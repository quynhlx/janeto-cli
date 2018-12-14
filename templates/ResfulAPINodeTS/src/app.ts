import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { container } from './ioc/container';
import { bindings } from './ioc/binding';

if(process.env.NODE_ENV !== 'production'){
  dotenv.load();
}

(async () => {
  // start the server
  await container.loadAsync(bindings);
  let server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(morgan('dev'));
  });

  let app = server.build();
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})();
