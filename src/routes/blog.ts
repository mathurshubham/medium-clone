
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';



export const blogRouter = new Hono<{
    Bindings:{    
        DATABASE_URL: string;
        JWT_SECRET: string;   
    }
}>();

blogRouter.use("/*", (c,next)=>{
    next();
});



blogRouter.post('/', async (c)=> {
    const body = await c.req.json();
    //add zod
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: 1
        }
    })

    return c.json({
        id: blog.id
    })
  })
  
blogRouter.put('/', async (c)=> {
    const body = await c.req.json();
    //add zod
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
  })

blogRouter.get('/',async (c)=>{
    const body = await c.req.json();
    //add zod
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: body.id
            }
        })
    
        return c.json({
            blog
        });
    }catch(e){
        c.status(411); //find 400 series for error fetching.
        return c.json({
            message: "error while fetching blogpost",
            error: e
        });
    }


  })


blogRouter.get("/bulk",async (c)=>{
    const body = await c.req.json();
    //add zod
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany();

    //learn about pagination and implement here;

    return c.json({
        blogs
    });
})