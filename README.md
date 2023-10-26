## 简介（Introduction)

这是一个routing-controllers的演示demo

## 技术栈（Scheme）

koa + @koa/router + routing-controllers

## 项目设计结构

```js
.
├── LICENSE
├── README.md
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── koa-demo
│   │   ├── UserController.ts
│   │   ├── app.ts
│   │   └── app1.js
│   └── routing-controllers-demo
│       ├── MyMiddleware.ts
│       ├── NameCorrectionInterceptor.ts
│       ├── UserController.ts
│       ├── UserService.ts
│       ├── app.ts
│       ├── appTypedi.ts
│       ├── globalLoggingMiddleware.ts
│       ├── globalNameCorrectionInterceptor.ts
│       └── loggingMiddleware.ts
└── tsconfig.json
```

## 使用（Usage）

### 克隆仓库
 
git clone git@github.com:willson-wang/nodejs-decorator-demo.git
 
### 安装依赖
 
pnpm install
 
### 构建模式

开发环境运行单纯的koa
```
pnpm dev:koa
```

开发环境运行routing-controllers
```
pnpm dev
```


