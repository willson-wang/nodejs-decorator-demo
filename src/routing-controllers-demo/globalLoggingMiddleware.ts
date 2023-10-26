import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class GlobalLoggingMiddleware implements KoaMiddlewareInterface {
  use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    console.log('【GlobalLoggingMiddleware】do something...');
    return next()
      .then(() => {
        console.log('【GlobalLoggingMiddleware】do something after execution');
      })
      .catch(error => {
        console.log('【GlobalLoggingMiddleware】error handling is also here');
      });
  }
}