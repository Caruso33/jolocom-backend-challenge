import { Application } from 'express'
import fs from 'fs'
import { Container } from 'inversify'
import 'reflect-metadata'
import createApp from '../src/app'
import { createAppContainer } from '../src/config/binding'
import { config } from '../src/config/config'
import { DBContext, getDataSource } from '../src/db/db.context'
import { UserService } from './../src/user/user.service'
import { getTestUser } from './utils'

describe('User Test', () => {
  let container: Container, dbContext: DBContext
  let isMigrationTestNeeded: boolean

  beforeAll(async () => {
    const appContainer = await createAppContainer()

    const createdApp: [Application, Container] = await createApp(
      config,
      appContainer,
    )
    container = createdApp[1]

    dbContext = await container.get(DBContext)
    await dbContext.runMigrations()

    const origDbContext = await getDataSource(true).initialize()
    isMigrationTestNeeded = await origDbContext.showMigrations()
    await origDbContext.destroy()
  })

  afterAll(async () => {
    const dbContext = await container.get(DBContext)
    await dbContext.close()
  })

  it('ensures creating an user is backwards compatible', async () => {
    const user = getTestUser()
    const userService: UserService = await container.get(UserService)

    if (!isMigrationTestNeeded) {
      console.log(`No migration tests needed`)

      if (!fs.existsSync('./__snapshots__/user.migration.test.ts.snap')) {
        console.log(
          `Setting up initial snapshot to compare user.service returns against in the future`,
        )
        await userService.createUser(user)
        const foundUser = await userService.getUser(1)
        expect(foundUser).toMatchSnapshot({
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        })
      }
      return
    }

    await dbContext.undoLastMigration()

    let users = await dbContext.user.query(
      `SELECT "id", "name", "email", "hasJoinedInvitation", "createdAt", "updatedAt" FROM "user_entity" LIMIT 1`,
    )
    expect(users.length).toBe(0)

    await dbContext.user.query(
      `INSERT INTO "user_entity" ("name", "email", "hasJoinedInvitation") VALUES ("${user.name}", "${user.email}", ${user.hasJoinedInvitation})`,
    )

    users = await dbContext.user.query(
      `SELECT "id", "name", "email", "hasJoinedInvitation", "createdAt", "updatedAt" FROM "user_entity" LIMIT 1`,
    )
    expect(users.length).toBe(1)
    expect(users[0]).toMatchObject({ ...user, hasJoinedInvitation: 1 }) // bools are saved as `0` / `1`

    await dbContext.runMigrations()

    const foundUser = await userService.getUser(1)

    expect(foundUser).toMatchObject({
      id: users[0].id,
      name: users[0].name,
      email: users[0].email,
      hasJoinedInvitation: !!users[0].hasJoinedInvitation, // see above: bools are saved as `0` / `1`
    })
    expect(foundUser).toHaveProperty('createdAt')
    expect(foundUser?.createdAt).toBeGreaterThan(0)
    expect(foundUser).toHaveProperty('updatedAt')
    expect(foundUser?.updatedAt).toBeGreaterThan(0)

    // testing snapshot against one from before migration
    expect(foundUser).toMatchSnapshot({
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    })
  })
})
