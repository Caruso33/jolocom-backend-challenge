import appRootDir from 'app-root-path'
import dotenv from 'dotenv'
import { strict as assert } from 'assert'
import { Oas3ToolsObjectOrientedConfig } from '@jolocom/oas3-tools-object-oriented'
import { oas3AppOptions } from './oas3'
import { OpenApiRequestHandler } from 'express-openapi-validator/dist/framework/types'

// Defining default environment variables
process.env.NODE_ENV =
  process.env.NODE_ENV === 'test'
    ? process.env.NODE_ENV
    : process.env.APP_ENV || 'dev'
process.env.API_VERSION = process.env.API_VERSION || 'v1'

// Loading env variables defined in .env file into the process.env scope
const envFound = dotenv.config()

if (envFound.error) {
  throw new Error("Couldn't find .env file")
}

// Asserting that required env variables are defined
const assertRequiredVariablesDefined = () => {
  assert(process.env.APP_PORT, "Expected 'process.env.APP_PORT' to be defined")
  assert(process.env.APP_ENV, "Expected 'process.env.APP_ENV' to be defined")
  assert(process.env.APP_HOST, "Expected 'process.env.APP_HOST' to be defined")
  assert(
    process.env.APP_SCHEME,
    "Expected 'process.env.APP_SCHEME' to be defined",
  )
  assert(
    process.env.SDK_CALLBACK_URL,
    "Expected 'process.env.SDK_CALLBACK_URL' to be defined",
  )
}

assertRequiredVariablesDefined()

/**
 * The main application configuration definition abstraction.
 */
export interface AppConfig {
  port: string
  env: string
  host: string
  schema: string
  apiVersion: string
  apiRootPath: string
  controllersPath: string

  logger: {
    logDir: string
  }

  openapi: (
    customMiddlewares?: OpenApiRequestHandler[],
  ) => Oas3ToolsObjectOrientedConfig
}

const oas3DeclarationFilePath = appRootDir + '/src/api/openapi.yaml'

/**
 * The main application configuration definition.
 */
export const config: AppConfig = {
  port: process.env.APP_PORT as string,
  env: process.env.APP_ENV as string,
  host: process.env.APP_HOST as string,
  schema: process.env.APP_SCHEME as string,
  apiVersion: process.env.API_VERSION as string,
  apiRootPath: '/api/' + process.env.API_VERSION,
  controllersPath: appRootDir + '/src/controller',

  logger: {
    logDir: process.env.LOG_DIR || appRootDir + '/var/log',
  },

  openapi: (customMiddlewares?: OpenApiRequestHandler[]) => ({
    oas3AppOptions: oas3AppOptions(oas3DeclarationFilePath),
    oas3DeclarationFilePath,
    customMiddlewares,
  }),
}
