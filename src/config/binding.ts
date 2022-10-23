import { AsyncContainerModule, Container } from 'inversify'
import { HelloController, UserController } from '../controller'
import { DBContext } from '../db/db.context'
import { Greeter } from '../hello/greeter'
import { TYPES } from '../types'
import { UserRepository } from '../user/user.repository'
import { UserService } from '../user/user.service'

export const binding = new AsyncContainerModule(async (bind) => {
  // database
  bind(DBContext).toSelf().inSingletonScope()

  // hello
  bind(TYPES.Controller).to(HelloController)
  bind<Greeter>(Greeter).toSelf().inSingletonScope()

  // user
  bind(TYPES.Controller).to(UserController)
  bind<UserService>(UserService).toSelf().inSingletonScope()
  bind<UserRepository>(UserRepository).toSelf().inSingletonScope()
})

export const createAppContainer = async (): Promise<Container> => {
  const container = new Container()
  await container.loadAsync(binding)

  const dbContext = await container.get(DBContext)
  await dbContext.init()

  return container
}
