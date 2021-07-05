import 'reflect-metadata'
import { AppConfig } from './config/config'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { TYPES } from './types'
import { oas3ToolsObjectOriented } from '@jolocom/oas3-tools-object-oriented'
import openapi from './middleware/openapi'
import { Application } from 'express'
import { createAppContainer } from './config/binding'

const createApp = async (
  config: AppConfig,
  appContainer?: Container,
): Promise<[Application, Container]> => {
  //use default appContainer if none provided
  const container = appContainer || (await createAppContainer())

  // Initialization of the inversify server app with configured service container.
  const server = new InversifyExpressServer(
    container,
    null,
    { rootPath: config.apiRootPath },
    null,
    null,
    false,
  )

  // Sets the configuration function to be applied to the application (attaching middlewares).
  server.setConfig((app) => {
    // Attach middleware to wire up oas3 declaration with controllers methods.
    app.use(
      oas3ToolsObjectOriented(
        container.getAll(TYPES.Controller),
        config.openapi([openapi()]),
      ),
    )
  })

  // Applies all routes and configuration to the server, returning the express application.
  const app = server.build()
  return [app, container]
}

export default createApp
