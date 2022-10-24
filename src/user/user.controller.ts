import { Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { CreateUser, User, ErrorMessage } from '../api/generated-schemas/models'
import { AppRequest } from '../middleware/appRequest'
import { UserService } from './user.service'

// @injectable()
@controller('/user')
export class UserController {
  constructor(private readonly user: UserService) {}

  /**
   * Create an user
   *
   * @param request create request with a body of user data
   * @param response response containing a {@link User}
   * @return {Promise<User>}
   */
  @httpPost('/')
  public async createUser(
    request: AppRequest<CreateUser>,
    response: Response<User>,
  ) {
    const createdUser = await this.user.createUser(request.body)

    return response.status(201).json(createdUser)
  }

  /**
   * Get an user
   *
   * @param request get request with an id parameter and no body
   * @param response response containing a {@link User}
   * @return {Promise<User | ErrorMessage>}
   */
  @httpGet('/:id')
  public async getUser(
    request: AppRequest<undefined, { id: string }>,
    response: Response<User | ErrorMessage>,
  ) {
    const user = await this.user.getUser(+request.pathParams.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    return response.status(200).json(user)
  }
}
