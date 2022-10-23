import { Application } from 'express'
import { Container } from 'inversify'
import 'reflect-metadata'
import request from 'supertest'
import createApp from '../src/app'
import { createAppContainer } from '../src/config/binding'
import { config } from '../src/config/config'
import { DBContext } from '../src/db/db.context'
import { getTestUser } from './utils'

/* 
  I've implemented integration tests and skipped unit tests
*/
describe('User Test', () => {
  let app: Application, container: Container

  beforeAll(async () => {
    const appContainer = await createAppContainer()

    const createdApp: [Application, Container] = await createApp(
      config,
      appContainer,
    )
    app = createdApp[0]
    container = createdApp[1]

    const dbContext: DBContext = await container.get(DBContext)
    await dbContext.runMigrations()
  })

  afterAll(async () => {
    const dbContext = await container.get(DBContext)
    await dbContext.close()
  })

  it('creates user', async () => {
    const user = {
      name: 'elrond',
      email: 'elrond@lindon.cc',
      hasJoinedInvitation: true,
    }

    const result = await request(app).post(`/api/v1/user`).send(user)

    expect(result.status).toBe(201)

    expect(result.body).toMatchObject(user)
    expect(typeof result.body.id).toBe('number')
    expect(typeof result.body.createdAt).toBe('number')
    expect(typeof result.body.updatedAt).toBe('number')
  })

  it('fetches an existing user', async () => {
    const user = getTestUser()

    let result = await request(app).post(`/api/v1/user`).send(user)
    expect(result.status).toBe(201)

    const createdUser = result.body

    result = await request(app).get(`/api/v1/user/${result.body.id}`).send()

    expect(result.status).toBe(200)
    expect(result.body).toMatchObject(user)
    expect(result.body).toEqual(createdUser)
  })

  it('fetches a not existing user', async () => {
    const result = await request(app).get(`/api/v1/user/999`).send()

    expect(result.status).toBe(404)
    expect(result.body).toEqual({
      message: 'User not found',
    })
  })
})
