import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { Env } from './interfaces/env'
import { logger } from 'hono/logger'
import kycRouter from './routes/kyc'
import userRouter from './routes/user'
import mockProviderRouter from './routes/mockProviderData'
import { authMiddleware } from './middleware/authMiddleware'

const app = new Hono<{ Bindings: Env }>()
app.use(prettyJSON())
app.use('/*', logger())
app.use('/*', authMiddleware)
app.notFound((c) => c.json({ message: 'Route not Found', ok: false }, 404))

app.options('*', (c) => {
    return c.text('', 204)
})

app.get('/', (c) => {
  return c.text(`Move along!`)
})

app.route('/kyc', kycRouter)
app.route('/user', userRouter)
app.route('/mock-data', mockProviderRouter)

export default app
