module.exports = {
  definitions: {
    props: {
      type: 'array',
      items: {
        type: ['object', 'string'],
        properties: {
          key: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          props: {
            $ref: '#/definitions/props'
          }
        },
        required: ['key']
      }
    }
  },
  $ref: '#/definitions/props'
}
