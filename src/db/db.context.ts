import { injectable } from 'inversify'
import { DataSource } from 'typeorm'
import { UserEntity } from '../user/user.entity'

const isTestEnv = process.env.NODE_ENV === 'test'

export const datasource = new DataSource({
  type: 'sqlite',
  database: isTestEnv ? ':memory:' : './jolocom.sqlite',
  synchronize: isTestEnv,
  logging: false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../**/migration/*.{js,ts}'],
  subscribers: [],
})

@injectable()
export class DBContext {
  private _db: DataSource

  async init() {
    this._db = await datasource.initialize()

    console.log('connected to DB')
  }

  async runMigrations() {
    await this._db.runMigrations()

    console.log('ran migrations')
  }

  async undoLastMigration() {
    await this._db.undoLastMigration()

    console.log('undid last migration')
  }

  async close() {
    this._db.destroy()
  }

  get user() {
    return this._db.getRepository(UserEntity)
  }
}
