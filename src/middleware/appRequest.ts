import { Request } from 'express'
import { OpenApiRequestMetadata } from 'express-openapi-validator/dist/framework/types'
import * as core from 'express-serve-static-core'
import * as qs from 'qs'

export interface OpenApiRequest<
  ReqBody = undefined,
  PathParams = core.ParamsDictionary,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
  ResBody = any,
> extends Request<PathParams, ResBody, ReqBody, ReqQuery, Locals> {
  openapi?: OpenApiRequestMetadata
  pathParams?: PathParams
}

//openapi validator is stupid and completely hides the generic types of the express request (which are actually useful)
//in its OpenApiRequest
//so here we are recreating that OpenApiRequest type but with the generic types passed through
//so that we can get access to types query and param objects
//i've messed with the order so that the most useful ones are at the front and we can ignore the later ones.
export interface AppRequest<
  ReqBody = undefined,
  PathParams = core.ParamsDictionary,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
  ResBody = any,
> extends Request<PathParams, ResBody, ReqBody, ReqQuery, Locals> {
  openapi: OpenApiRequestMetadata
  pathParams: PathParams
}
