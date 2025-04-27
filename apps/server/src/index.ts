import Fastify from 'fastify'
import fastifyMiddie from '@fastify/middie'
import fastifyCors from '@fastify/cors'
import { add } from '@template-turborepo-vue/math'
import helloWorld from './modules/helloWorld'

const app = Fastify({
  logger: true
})

app.register(fastifyMiddie)
app.register(fastifyCors, {})

app.get('/msg', async (request, reply) => {
  return { msg: `This is a message from the server! ${helloWorld('typescript!')} ${add(1, 2)}` }
})

await app.listen({ host: process.env.HOST, port: Number(process.env.PORT) })
