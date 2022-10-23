import { injectable } from 'inversify'
import { CreateUser } from '../api/generated-schemas/models'
import { UserDto } from './user.dto'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'

/* 
  Business logic of user 
*/
@injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(user: CreateUser) {
    // basic validation

    if (!user.name || typeof user.name !== 'string') {
      throw Error(`User name is missing`)
    }

    const emailRegex =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

    if (
      !user.email ||
      typeof user.email !== 'string' ||
      !emailRegex.test(user.email)
    ) {
      throw Error(`User email is missing or has wrong format`)
    }

    if (!user.hasJoinedInvitation) {
      user.hasJoinedInvitation = false
    }

    const createdUser = await this.userRepo.create(user)

    return UserDto.to(createdUser)
  }

  async getUser(id: UserEntity['id']) {
    const user = await this.userRepo.findOne(id)

    if (!user) {
      return null
    }

    return UserDto.to(user)
  }
}
