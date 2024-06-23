
import { Hono } from 'hono';

export const blogRouter = new Hono<{
    Bindings:{    
        DATABASE_URL: string;
        JWT_SECRET: string;   
    }
}>();



blogRouter.post('/',(c)=> {
    return c.text("Hello from blog!")
  })
  
blogRouter.put('/',(c)=> {
return c.text("Hello from blog! put ")
})

blogRouter.get('/',(c)=>{
return c.text("hello from blog id")
})

blogRouter.get("/bulk",(c)=>{
return c.text('hello from blog bulk')
})