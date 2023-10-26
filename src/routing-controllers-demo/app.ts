import 'reflect-metadata';

const Layer = require('@koa/router/lib/layer')

console.log('Layer', Layer);

import { createKoaServer } from 'routing-controllers';
import { UserController } from './UserController';
import { GlobalLoggingMiddleware } from './globalLoggingMiddleware'
import { GlobalNameCorrectionInterceptor } from './globalNameCorrectionInterceptor'

// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({
  controllers: [UserController], // we specify controllers we want to use
  middlewares: [GlobalLoggingMiddleware],
  interceptors: [GlobalNameCorrectionInterceptor]
});

const globalMiddleware = app.middleware.map((mid:any) => {
  return mid
})

const routeMiddleware = app.middleware[2].router.stack.map((route: any) => {
  return {
    middleware: route.stack,
    path: route.path,
    methods: route.methods,
  }
})

console.log('app', app.middleware, globalMiddleware);
console.log(routeMiddleware, app.middleware[2].router.stack[0].stack)
// run express application on port 3000
app.listen(3000, () => {
  console.log('http://localhost:3000');
});