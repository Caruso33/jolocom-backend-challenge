import { OpenApiRequest } from './appRequest'
import { NextFunction, Response } from 'express'

const openapi =
  () => (request: OpenApiRequest, response: Response, next: NextFunction) => {
    const openapi = request.openapi

    if (!openapi) {
      return next()
    }

    request.pathParams = openapi.pathParams //params isn't set by express for some reason so set it here

    return next()
  }

export default openapi
