import 'reflect-metadata' // this is needed for inversify
import { Application } from 'express'
import { Container } from 'inversify'
import { createAppContainer } from '../src/config/binding'
import { config } from '../src/config/config'
import createApp from '../src/app'
import request from 'supertest'
import { HelloResource } from '../src/api/generated-schemas/models'

const createIntTestApp = async (): Promise<[Application, Container]> => {
  const container = await createAppContainer()
  //Could rebind the dependencies here to something more suitable for an integration test if needed

  return createApp(config, container)
}

describe('Hello Test', () => {
  it('get hello', async () => {
    const [app] = await createIntTestApp()

    const helloResult = await request(app).get(`/api/v1/hello/${'test'}`).send()

    expect(helloResult.status).toBe(200)
    expect(helloResult.body).toEqual<HelloResource>({
      message: 'Hello test!',
    })
  })
})
