const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log = require('log4js');
const util = require('./utils/util');

require('./config/db')

const appRouter = require('koa-router')()
const userRoute = require('./routes/users');

// error handler
onerror(app)


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  log.level = "debug";
  // log.info("Some debug messages");

  // const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

appRouter.prefix("/api")
appRouter.use(userRoute.routes(), userRoute.allowedMethods());

// app.use(appRouter.routes(), appRouter.allowedMethods());

app.use(appRouter.routes(), appRouter.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log.error("Some debug messages");
});

module.exports = app
