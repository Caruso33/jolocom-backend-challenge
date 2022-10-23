import { injectable } from 'inversify'
import { CreateUser } from '../api/generated-schemas/models'
import { DBContext } from '../db/db.context'
import { UserEntity } from './user.entity'

/* 
  Lower level repository to interact with database layer
*/
@injectable()
export class UserRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async create(user: CreateUser) {
    return this._dbContext.user.save(user)
  }

  async findOne(id: UserEntity['id']) {
    return this._dbContext.user.findOne({ where: { id } })
  }
}
