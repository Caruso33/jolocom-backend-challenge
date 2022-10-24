import { injectable } from 'inversify'
import { CreateUser } from '../api/generated-schemas/models'
import { UserDto } from './user.dto'
import { UserEntity, UserMetaEntity } from './user.entity'
import { UserMetaRepository, UserRepository } from './user.repository'

/* 
  Business logic of user 
*/
@injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userMetaRepo: UserMetaRepository,
  ) {}

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

    const newMetaUser = new UserMetaEntity()
    newMetaUser.hasJoinedInvitation = user.hasJoinedInvitation

    await this.userMetaRepo.create(newMetaUser)

    const newUser = new UserEntity()
    newUser.name = user.name
    newUser.email = user.email
    newUser.metadata = newMetaUser

    await this.userRepo.create(newUser)

    return UserDto.toUserEntity(newUser)
  }

  async getUser(id: UserEntity['id']) {
    const user = await this.userRepo.findOne(id)

    if (!user) {
      return null
    }

    return UserDto.toUserEntity(user)
  }
}
