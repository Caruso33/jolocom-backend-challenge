import { injectable } from 'inversify'
import { Response } from 'express'
import { HelloResource } from '../api/generated-schemas/models'
import { AppRequest } from '../middleware/appRequest'
import { Greeter } from './greeter'

@injectable()
export class HelloController {
  //You can use inversify to inject dependencies in here if you want.
  //the injection done here is not a great example because it's just a wrapper for a function,
  //but it shows how something can be injeted.
  constructor(readonly greeter: Greeter) {}

  /**
   * Get a hello
   *
   * @param request simple get request with a thing parameter and no body
   * @param response response containing a {@link HelloResource}
   * @return {Promise<void>}
   */
  public async getHello(
    request: AppRequest<undefined, { thing: string }>,
    response: Response<HelloResource>,
  ) {
    //need to use pathParams, not params (params doesn't work for some reason)
    const helloMessage = this.greeter.hello(request.pathParams.thing)
    return response.status(200).json({ message: helloMessage })
  }
}
