
import * as Koa from 'koa';
import * as bodyParse from 'koa-bodyparser'
import userRouter from './UserController';

var app = new Koa();

app
  .use(bodyParse())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());


// run express application on port 3000
app.listen(3000, () => {
  console.log('http://localhost:3000');
});