import { User } from '../api/generated-schemas/models'
import { UserEntity } from './user.entity'

export class UserDto {
  // converts user entities from db to dtos for api transfer
  static to(user: UserEntity) {
    const dto: User = {
      ...user,
      hasJoinedInvitation: user.hasJoinedInvitation,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    }

    return dto
  }
}
