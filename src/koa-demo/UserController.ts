import * as Router from '@koa/router';

// import { IsEnum } from 'class-validator'
import { Context } from 'koa'
let router = new Router();

// import { NameCorrectionInterceptor } from "./NameCorrectionInterceptor";
// import { MyMiddleware } from './MyMiddleware';
// import { loggingMiddleware } from './loggingMiddleware';

// enum Roles {
//   Admin = "admin",
//   User = "user",
//   Guest = "guest",
// }

// type User = {}

// type Post = {}

// class GetUsersQuery {

//   @IsEnum(Roles)
//   role: Roles;

// }
// @UseBefore(MyMiddleware)
// @UseAfter(loggingMiddleware)
class UserController {
  
  // @Get('/users')
  getAll(ctx: Context) {
    console.log('【controller】get users');
    ctx.body = 'This action returns all users';
  }

  // @Get('/users/:id') // 
  getOne(ctx: Context) {// 注入param参数id,且id的类型要是number类型，然后会直接抛错
    const { id } = ctx.params
    if (isNaN(parseInt(id))) {
      ctx.body = 'id 传入参数类型不对'
    } else {
      ctx.body = 'This action returns user #' + id;
    }
  }
  

  // @Get("/get-users")
  getUsers(ctx: Context) { // 注入query中的参数
    const { limit } = ctx.query
    if (!limit || (limit && isNaN(parseInt(limit as string)))) {
      ctx.body = 'limit 类型不对'
    } else {
      ctx.body = 'query limit value is' + limit;
    }
  }

  // @Get("/users/by-multiple-ids")
  getUsersArr(ctx: Context) { // 注入query中的参数，且ids是数组格式
    const { ids } = ctx.query
    ctx.body = 'query ids value is' + JSON.stringify(ids);
  }

  // @Get("/get-users-all")
  getUsersAll(ctx: Context) { // 注入所有query参数
      ctx.body = 'query all value is' + JSON.stringify(ctx.query);
  }

  // @Post('/save-users')
  post(ctx: Context) { // 注入post请求的body参数, 获取的是整个post的body内容
    ctx.body = 'Saving user... and use is' + JSON.stringify(ctx.request.body);
  }

  // @Post('/save-users-validate')
  postRequire(ctx: Context) { // 注入post请求的body参数, 获取的是整个post的body内容，且对body参数做非空校验
    if (!ctx.request.body || !Object.keys(ctx.request.body).length) {
      ctx.body = 'body 参数为空'
    } else {
      ctx.body = 'Saving user... and use is' + JSON.stringify(ctx.request.body);
    }
  }

  // @Post("/save-users-param")
  saveUser(ctx: Context) { // 注入body对象中的name属性
    // @ts-ignore
    const { name } = ctx.request.body
    ctx.body =  'Saving user... and name is' + name;
  }

  // @Post("/save-users-header")
  saveUserHeader(ctx: Context) { // 注入request header对象中的authorization属性
    const { authorization } = ctx.headers
    ctx.body =  'Saving user... and HeaderParam authorization is' + authorization;
  }

  // @Get("/get-users-cookie")
  getUsersCookie(ctx: Context) { // 注入request cookie对象中的username cookie
    const { cookie } = ctx.headers;
    ctx.body =  'Saving user... and CookieParam username is' + cookie;
  }

  // @Post("/files")
  saveFile(ctx: Context) { // Inject uploaded file
    // @UploadedFile("fileName") file: any
  }

  // @Delete('/users/:id')
  remove(ctx: Context) {
    const { id } = ctx.params
    ctx.body =  'Removing user... id is '+ id;
  }

  // @Get('/users-req')
  getAllUsers(ctx: Context) { // 注入ctx.req 与ctx.res对象
    console.log('req', ctx.request);
    ctx.response.status = 202;
    ctx.response.set('Cache-Control', 'no-cache');
    // ctx.body = 'Hello response!';
    // 注意一定要ctx.body = 值，ctx.body = 就相当于ctx.body
    ctx.body =  'abc'
  }


  /**  response opration  **/ 
  // @Get("/users-content-type")
  // @ContentType("text/html") // 设置 respopnse ContentType
  getUsersSetContentType(ctx: Context) {
      ctx.type = 'text/html; charset=utf-8';
      ctx.body =  '<div>aaaaa</div>'
  }

  // @Get("/users-location")
  // @Location("http://github.com") // 设置 respopnse Location
  getUsersSetLocation(ctx: Context) {
      // ...
      ctx.body =  'http://github.com'
  }

  // @Get("/users-redirect")
  // @Redirect("http://github.com") // 设置重定向
  getUsersSetRedirect(ctx: Context) {
      ctx.redirect('http://github.com');
  }

  // @HttpCode(201) // 设置 respopnse http 状态码
  // @Get("/users-http-code")
  userSetCode(ctx: Context) {
      // ...
      ctx.status = 201;
      ctx.body =  'set code 201';
  }

  // @Get("/users-set-header/:id")
  // @Header("Cache-Control", "no-store") // 设置 respopnse header内的属性
  getOneSetHeader(ctx: Context) {
      ctx.set('Cache-Control', 'no-store');
      ctx.body =  'set cache-control';
  }

  // @Get("/users-set-error/:id")
  getOneThrowError(ctx: Context) {
      const { id } = ctx.params;
      const user = Math.random() * 10;
      if (user > 5)
          throw new Error(`User was not found.`); // 抛出常用的错误码

      ctx.body =  `${user} --- ${id}`;
  }

  // @Get("/users-use-interceptor")
  // @UseInterceptor(function(action: Action, content: any) {
  //     ctx.body =  content.replace(/Mike/gi, "Michael");
  // })
  getOneUseInterceptor(ctx: Context) {
      ctx.body =  "Hello, I am Mike!".replace(/Mike/gi, "Michael"); // client will get a "Hello, I am Michael!" response.
  }

  // @Get("/users-use-class-interceptor")
  // @UseInterceptor(NameCorrectionInterceptor)
  getOneUseClassInterceptor(ctx: Context) {
      ctx.body =  "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
  }
}

const routerMap = {
  '/users': {
    method: 'get',
    handle: 'getAll'
  },
  '/users/:id': {
    method: 'get',
    handle: 'getOne'
  },
  '/get-users': {
    method: 'get',
    handle: 'getUsers'
  },
  '/users1/by-multiple-ids': {
    method: 'get',
    handle: 'getUsersArr'
  },
  '/get-users-all': {
    method: 'get',
    handle: 'getUsersAll'
  },
  '/save-users': {
    method: 'post',
    handle: 'post'
  },
  '/save-users-validate': {
    method: 'post',
    handle: 'postRequire'
  },
  '/save-users-param': {
    method: 'post',
    handle: 'saveUser'
  },
  '/save-users-header': {
    method: 'post',
    handle: 'saveUserHeader'
  },
  '/get-users-cookie': {
    method: 'get',
    handle: 'getUsersCookie'
  },
  '/files': {
    method: 'post',
    handle: 'saveFile'
  },
  '/delete-users/:id': {
    method: 'delete',
    handle: 'remove'
  },
  '/users-req': {
    method: 'get',
    handle: 'getAllUsers'
  },
  '/users-content-type': {
    method: 'get',
    handle: 'getUsersSetContentType'
  },
  '/users-location': {
    method: 'get',
    handle: 'getUsersSetLocation'
  },
  '/users-redirect': {
    method: 'get',
    handle: 'getUsersSetRedirect'
  },
  '/users-http-code': {
    method: 'get',
    handle: 'userSetCode'
  },
  '/users-set-header/:id': {
    method: 'get',
    handle: 'getOneSetHeader'
  },
  '/users-set-error/:id': {
    method: 'get',
    handle: 'getOneThrowError'
  },
  '/users-use-interceptor': {
    method: 'get',
    handle: 'getOneUseInterceptor'
  },
  '/users-use-class-interceptor': {
    method: 'get',
    handle: 'getOneUseClassInterceptor'
  },
}
const userInstance = new UserController();
Object.keys(routerMap).forEach((key) => {
  const { method, handle} = routerMap[key as '/users'];
  // // @ts-ignore
  // console.log('method', method, key, userInstance[handle] );
  // @ts-ignore
  router[method](key, userInstance[handle])
})

export default router