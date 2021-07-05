const path = require('path');
const { generate } = require('openapi-typescript-validator');

generate({
  schemaFile: path.join(__dirname, 'src/api/openapi.yaml'),
  schemaType: 'yaml',
  directory: path.join(__dirname, '/src/api/generated-schemas'),
  //we use express-openapi-validator middleware instead of decoders
  //could switch in the future
  skipDecoders: true,
  addFormats: true,


  //don't use this stuff so may as well skip
  skipMetaFile: true,
  skipSchemaFile: true
})