import { Hono } from 'hono'
import { userRouter } from './routes/user'
import {blogRouter} from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
    Bindings:{
      DATABASE_URL: string;
      JWT_SECRET: string
    }
   }>()
app.use("/*",cors());


//Bindings are required to eliminate typscript error for env.
//prisma needs to be initiated for every route and can't be globally initiated as the env is not accessible globally

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);





export default app
