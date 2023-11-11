import type { MiddlewareContext } from '~/types'

function middlewarePipeline(context: MiddlewareContext, middleware: any, index: number) {
  const nextMiddleware = middleware[index]
  if (!nextMiddleware)
    return context.next

  return async () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1,
    )
    await nextMiddleware({ ...context, next: nextPipeline })
  }
}
export default middlewarePipeline
