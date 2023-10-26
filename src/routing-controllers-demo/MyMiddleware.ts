import { KoaMiddlewareInterface } from 'routing-controllers';

export class MyMiddleware implements KoaMiddlewareInterface {
  // interface implementation is optional

  use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    console.log('【MyMiddleware】do something before execution...');
    return next()
      .then(() => {
        console.log('【MyMiddleware】do something after execution');
      })
      .catch(error => {
        console.log('【MyMiddleware】error handling is also here');
      });
  }
}