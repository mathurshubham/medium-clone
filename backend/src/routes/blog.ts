
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';



export const blogRouter = new Hono<{
    Bindings:{    
        DATABASE_URL: string;
        JWT_SECRET: string;   
    },
    Variables: {
        userId: string,
    }
}>();

blogRouter.use("/*", async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    
    
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);
        console.log(user);

        if (user && typeof user.id == 'number') {
            c.set("userId", user.id);
            await next();
        } else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    }catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in",
            error: e
        })

    }


})
    



blogRouter.post('/', async (c)=> {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
  })
  
blogRouter.put('/', async (c)=> {
    const body = await c.req.json();
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


  blogRouter.get("/bulk",async (c)=>{
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany();

    //learn about pagination and implement here;

    return c.json({
        blogs
    });
})


//since /bulk is before /:id end point, the control will reach at bulk to get all blogs. 

blogRouter.get('/:id',async (c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
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


