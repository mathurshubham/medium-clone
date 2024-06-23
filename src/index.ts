import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
    Bindings:{
      DATABASE_URL: string;
      JWT_SECRET: string
    }
   }>()

//Bindings are required to eliminate typscript error for env.
//prisma needs to be initiated for every route and can't be globally initiated as the env is not accessible globally


app.post('/api/v1/user/signup',async (c)=> {
  const body = await c.req.json();
  //add zod
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const user = await prisma.user.create({
      data:{
        username: body.username,
        password: body.password,
        name: body.name
      }
    })
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.text(jwt)
  }catch(e){
    console.log(e)
    c.status(411)
    return c.text('Invalid');
  }



})



app.post('/api/v1/user/signin', async (c)=> {
  const body = await c.req.json();
  //add zod
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const user = await prisma.user.findFirst({
      where:{
        username: body.username,
        password: body.password,
      }
    })
    if(!user){
        c.status(403);
        return c.json({
          message: "Invalid, username or password doesn't match."
        })
      }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.text(jwt)
  }catch(e){
    console.log(e)
    c.status(411)
    return c.text('Invalid');
  }
})

app.post('/api/v1/blog',(c)=> {
  return c.text("Hello from blog!")
})

app.put('/api/v1/blog',(c)=> {
  return c.text("Hello from blog! put ")
})

app.get('/api/v1/blog',(c)=>{
  return c.text("hello from blog id")
})

app.get("/api/v1/blog/bulk",(c)=>{
  return c.text('hello from blog bulk')
})

export default app


