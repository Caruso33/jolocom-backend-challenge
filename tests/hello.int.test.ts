import { Application } from 'express'
import { Container } from 'inversify'
import 'reflect-metadata' // this is needed for inversify
import request from 'supertest'
import { HelloResource } from '../src/api/generated-schemas/models'
import createApp from '../src/app'
import { createAppContainer } from '../src/config/binding'
import { config } from '../src/config/config'

describe('Hello Test', () => {
  let app: Application

  beforeEach(async () => {
    const appContainer = await createAppContainer()
    //Could rebind the dependencies here to something more suitable for an integration test if needed

    const createdApp: [Application, Container] = await createApp(
      config,
      appContainer,
    )

    app = createdApp[0]
  })

  it('get hello', async () => {
    const helloResult = await request(app).get(`/api/v1/hello/${'test'}`).send()

    expect(helloResult.status).toBe(200)
    expect(helloResult.body).toEqual<HelloResource>({
      message: 'Hello test!',
    })
  })
})
