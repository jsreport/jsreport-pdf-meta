module.exports = {
  'name': 'pdf-meta',
  'dependencies': ['templates'],
  'main': 'lib/main.js',
  'optionsSchema': {
    extensions: {
      'pdf-meta': {
        type: 'object',
        properties: {
          producer: { type: 'string' }
        }
      }
    }
  }
}
