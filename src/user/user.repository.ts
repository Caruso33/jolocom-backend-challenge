import { injectable } from 'inversify'
import { CreateUser } from '../api/generated-schemas/models'
import { DBContext } from '../db/db.context'
import { UserEntity, UserMetaEntity } from './user.entity'
import { CreateUserMetaEntity } from './user.types'

/* 
  Lower level repository to interact with database layer
*/
@injectable()
export class UserRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async create(user: CreateUser) {
    return this._dbContext.user.save(user)
  }

  async findOne(
    id: UserEntity['id'],
    options = {
      relations: {
        metadata: true,
      },
    },
  ) {
    return this._dbContext.user.findOne({ where: { id }, ...options })
  }
}

@injectable()
export class UserMetaRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async create(user: CreateUserMetaEntity): Promise<UserMetaEntity> {
    return this._dbContext.userMeta.save(user)
  }
}
