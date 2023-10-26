export function loggingMiddleware(context: any, next: (err?: any) => Promise<any>): Promise<any> {
  console.log('【loggingMiddleware】something before execution...');
  return next()
    .then(() => {
      console.log('【loggingMiddleware】do something after execution');
    })
    .catch(error => {
      console.log('【loggingMiddleware】error handling is also here');
    });
}