export default () => {
  return async (ctx, next) => {
    // todo
    console.log('mid3-start')
    await next()
    // todo
    console.log('mid3-end')
  }
}
