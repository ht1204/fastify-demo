'use strict'

const path = require('path')
const fastify = require('fastify')({
    logger: {
        prettyPrint: true
    }
})
const port = process.env.PORT || 3000

fastify.register(require('point-of-view'), {
    engine: {
        handlebars: require('handlebars')
    }
})

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
})

const queryschema = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                course: {
                    type: 'string'
                }
            },
            required: ['course']
        }
    }
}


fastify.get('/', queryschema, (request, reply) => {

    const name = request.query.name || 'Anonymous'
    const course = request.query.course || 'course'
    reply.view('/templates/index.hbs', { name, course })

})


async function start() {
    await fastify.listen(port)
}

start().catch(err => {
    fastify.log.error(err)
    process.exit(1)
})