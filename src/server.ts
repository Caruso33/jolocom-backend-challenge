import 'reflect-metadata'
import { config } from './config/config'
import { logger } from './config/logger'
import createApp from './app'
;(async () => {
  const [app] = await createApp(config)
  // Listening for connections.
  app.listen(config.port, () => {
    logger.info(
      `Server started at ${config.schema}://${config.host}:${config.port}`,
    )
    logger.info(
      `Docs available at ${config.schema}://${config.host}:${config.port}/docs`,
    )
  })
})()
