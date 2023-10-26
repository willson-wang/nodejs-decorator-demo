import { Controller, Param, Body, Get, Post, Delete, Req, Res, QueryParam, QueryParams, BodyParam, HeaderParam, CookieParam, UploadedFile, ContentType, Location, Redirect, HttpCode, Header, NotFoundError, UseBefore, UseAfter, UseInterceptor, Action } from 'routing-controllers';
import { IsEnum } from 'class-validator'
import { Context } from 'koa'

import { NameCorrectionInterceptor } from "./NameCorrectionInterceptor";
import { MyMiddleware } from './MyMiddleware';
import { loggingMiddleware } from './loggingMiddleware';

enum Roles {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

type User = {}

type Post = {}

class GetUsersQuery {

  @IsEnum(Roles)
  role: Roles;

}

@Controller()
@UseBefore(MyMiddleware)
@UseAfter(loggingMiddleware)
export class UserController {
  
  @Get('/users')
  getAll() {
    console.log('【controller】get users');
    return 'This action returns all users';
  }

  @Get('/users/:id') // 
  getOne(@Param('id') id: number) {// 注入param参数id,且id的类型要是number类型，然后会直接抛错
    return 'This action returns user #' + id;
  }
  

  @Get("/get-users")
  getUsers(@QueryParam("limit") limit: number) { // 注入query中的参数
    return 'query limit value is' + limit;
  }

  @Get("/users/by-multiple-ids")
  getUsersArr(@QueryParam("ids", { isArray: true}) ids: string[]) { // 注入query中的参数，且ids是数组格式
    return 'query ids value is' + JSON.stringify(ids);
  }

  @Get("/get-users-all")
  getUsersAll(@QueryParams() query: GetUsersQuery) { // 注入所有query参数
      return 'query all value is' + JSON.stringify(query);
  }

  @Post('/save-users')
  post(@Body() user: User) { // 注入post请求的body参数, 获取的是整个post的body内容
    return 'Saving user... and use is' + JSON.stringify(user);
  }

  @Post('/save-users-validate')
  postRequire(@Body({ required: true }) user: any) { // 注入post请求的body参数, 获取的是整个post的body内容，且对body参数做非空校验
    return 'Saving user... and use is' + JSON.stringify(user);
  }

  @Post("/save-users-param")
  saveUser(@BodyParam("name") userName: string) { // 注入body对象中的name属性
    return 'Saving user... and name is' + userName;
  }

  @Post("/save-users-header")
  saveUserHeader(@HeaderParam("authorization") token: string) { // 注入request header对象中的authorization属性
    return 'Saving user... and HeaderParam authorization is' + token;
  }

  @Get("/get-users-cookie")
  getUsersCookie(@CookieParam("username") username: string) { // 注入request cookie对象中的username cookie
    return 'Saving user... and CookieParam username is' + username;
  }

  @Post("/files")
  saveFile(@UploadedFile("fileName") file: any) { // Inject uploaded file

  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user... id is '+ id;
  }

  @Get('/users-req')
  getAllUsers(@Req() request: any, @Res() response: Context) { // 注入ctx.req 与ctx.res对象
    console.log('req', request);
    response.status = 202;
    response.set('Cache-Control', 'no-cache');
    // ctx.body = 'Hello response!';
    // 注意一定要return值，return就相当于ctx.body
    return 'abc'
  }


  /**  response opration  **/ 
  @Get("/users-content-type")
  @ContentType("text/html") // 设置 respopnse ContentType
  getUsersSetContentType() {
      // ...
      return '<div>aaaaa</div>'
  }

  @Get("/users-location")
  @Location("http://github.com") // 设置 respopnse Location
  getUsersSetLocation() {
      // ...
      return 'http://github.com'
  }

  @Get("/users-redirect")
  @Redirect("http://github.com") // 设置重定向
  getUsersSetRedirect() {
      // ...
      return 'http://github.com'
  }

  @HttpCode(201) // 设置 respopnse http 状态码
  @Get("/users-http-code")
  userSetCode() {
      // ...
      return 'set code 201';
  }

  @Get("/users-set-header/:id")
  @Header("Cache-Control", "no-store") // 设置 respopnse header内的属性
  getOneSetHeader(@Param("id") id: number) {
      // ...
      return 'This action returns id #' + id;
  }

  @Get("/users-set-error/:id")
  getOneThrowError(@Param("id") id: number) {

      const user = Math.random() * 10;
      if (user > 5)
          throw new NotFoundError(`User was not found.`); // 抛出常用的错误码

      return `${user} --- ${id}`;
  }

  @Get("/users-use-interceptor")
  @UseInterceptor(function(action: Action, content: any) {
      return content.replace(/Mike/gi, "Michael");
  })
  getOneUseInterceptor() {
      return "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
  }

  @Get("/users-use-class-interceptor")
  @UseInterceptor(NameCorrectionInterceptor)
  getOneUseClassInterceptor() {
      return "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
  }
}