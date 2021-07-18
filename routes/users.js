const router = require('koa-router')()
const User = require('./../models/userScheme')
const util = require('../utils/util')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.prefix('/users')

router.get('/test', (ctx) => {
  ctx.body = 'this is a users response!'
  console.log('error')
  // try {
  //   ctx.body = util.success('The test is success !')
  // } catch (error) {
  //   ctx.body = util.fail(`查询失败：${error.stack}`);
  // }
})

router.get('/login', async (ctx )=> {
  const { userName, userPwd } = ctx.request.body
  const res = await User.findOne({
    userName,
    userPwd
  })
  if (res) {
    ctx.body = util.success(res)
  } else {
    ctx.body = util.fail('aasas')
  }
})


module.exports = router
