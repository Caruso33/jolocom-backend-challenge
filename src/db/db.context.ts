import { injectable } from 'inversify'
import { DataSource } from 'typeorm'
import { UserEntity, UserMetaEntity } from '../user/user.entity'
import 'dotenv/config'

export function getDatabase(env: string) {
  const envDbMapping: Record<string, string> = {
    test: ':memory:',
    dev: './jolocom.sqlite',
  }

  return envDbMapping[env]
}

export function getDataSource(getOriginalDatabase = false) {
  const database = getDatabase(
    getOriginalDatabase || !process.env.NODE_ENV
      ? (process.env.APP_ENV as string)
      : (process.env.NODE_ENV as string),
  )

  const datasource = new DataSource({
    type: 'sqlite',
    database,
    synchronize: false,
    logging: false,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../**/migration/*.{js,ts}'],
    subscribers: [],
  })

  return datasource
}

export const datasource = getDataSource()

@injectable()
export class DBContext {
  private _db: DataSource

  async init() {
    this._db = await getDataSource().initialize()

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

  async showMigrations() {
    return await this._db.showMigrations()
  }

  async close() {
    this._db.destroy()
  }

  get user() {
    return this._db.getRepository(UserEntity)
  }

  get userMeta() {
    return this._db.getRepository(UserMetaEntity)
  }
}
