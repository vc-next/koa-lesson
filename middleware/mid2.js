export default () => {
  return async (ctx, next) => {
    // todo
    console.log('mid2-start')
    await next()
    console.log('mid2-end')
    // todo
  }
}
