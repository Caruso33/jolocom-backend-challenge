# Jolocom Backend Challenge Service

The **"Jolocom Backend Challenge"** is a reference application using jolocoms current pattern 
for an API backend with typescript. 

## Design

The application uses an "API First" approach, where the api contract is defined
as an "OpenAPI 3.0" specification located in ['openapi.yaml'][5].

There exist a few tools / conveniences included in this application to aid in this:
* `yarn generate-schemas` (or `yarn build`) can be used to generate typescript interfaces for the schemas defined in the open api spec.
They will be placed in `src/api/generated-schemas/models`.
* Middleware is included to automatically validate incoming requests (and also responses) against the open api
  specification.
* The spec can be wired up to class based controllers by using `x-swagger-router-controller` to specify the name of a controller class, and
`operationId` to specify a method that will handle the operation/endpoint.
* The `AppRequest` and `Response` types can be used in controller methods to correctly type the requests and responses.



## Requirements
  * node14 & yarn 

## Usage

To build your application on top of **"Jolocom Backend Challenge Service"** you need just follow 5 simple steps:
1. Fork it (rename if required).
2. Clone forked repository.
3. [Install](#installation) dependencies.
4. [Configure](#configuration) application.
5. [Run](#running-the-application) it.

#### **Installation**
Yarn:
```bash
yarn
```

#### **Configuration**
First of all you need to create `.env` file with required environment variables
(`.env.dist` is an example of `.env`).

For simplification of creation default `.env` file, was added command under the *"scripts"* definition:

Yarn:
```bash
yarn run dotenv-init
```

:warning: *The main application configuration definition located in ['./src/config/config.ts'][4]*

#### **Running the application**

Yarn:
```bash
yarn run start
```

Or run in debug mode (after run in debug mode you can attach debugger):

Yarn:
```bash
yarn run debug
```

:tada: At this point you have configured a working application with an example endpoint.

To see list of all available endpoints you can use *['Swagger UI'][6]* (sandbox)
which can be reached on http://localhost:9000/docs (with default server configuration).

#### **Development**

There are a few useful yarn commands for development.

`yarn start` - Run the application with hot reloads

`yarn debug` - Run in debug mode so a debugger can be attached

`yarn generate-schemas` - Generate typescript interfaces from openapi schemas

`yarn format` - Format with prettier

`yarn lint` - Lint with eslint

`yarn test` - Run tests with jest


## License

[Apache-2.0][3]

[1]: https://github.com/jolocom/jolocom-sdk
[2]: https://expressjs.com/
[3]: https://www.apache.org/licenses/LICENSE-2.0.txt
[4]: src/config/config.ts
[5]: src/api/openapi.yaml
[6]: https://swagger.io/tools/swagger-ui/
[7]: https://github.com/jolocom/jolocom-example-service
