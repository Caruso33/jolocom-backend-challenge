import { User } from '../api/generated-schemas/models'
import { UserEntity } from './user.entity'

export class UserDto {
  // converts user entities from db to dtos for api transfer
  static toUserEntity(user: UserEntity) {
    const dto: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      hasJoinedInvitation: user.metadata.hasJoinedInvitation,
      createdAt: user.metadata.createdAt.getTime(),
      updatedAt: user.metadata.updatedAt.getTime(),
    }

    return dto
  }
}
