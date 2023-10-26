import 'reflect-metadata';
import { createKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { UserController } from './UserController';

useContainer(Container);

// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({
  controllers: [UserController], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3000);