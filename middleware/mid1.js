export default () => {
  return async (ctx, next) => {
    // todo
    console.log('mid1-start')
    await next()
    console.log('mid1-end')
    // todo
  }
}
