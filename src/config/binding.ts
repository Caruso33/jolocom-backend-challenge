import { AsyncContainerModule, Container } from 'inversify'
import { TYPES } from '../types'
import {} from '../controller'
import { HelloController } from '../hello/helloController'
import { Greeter } from '../hello/greeter'

export const binding = new AsyncContainerModule(async (bind) => {
  // you might want to create your db connection here and setup your repositories for injection

  //World
  bind(TYPES.Controller).to(HelloController)
  bind<Greeter>(Greeter).toSelf().inSingletonScope()
})

export const createAppContainer = async (): Promise<Container> => {
  const container = new Container()
  await container.loadAsync(binding)
  return container
}
