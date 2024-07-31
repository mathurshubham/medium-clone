import React from 'react'
import { BlogCard } from '../components/BlogCard'
import { Appbar } from '../components/Appbar'
import { useBlogs } from '../hooks';


const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if (loading){
        return <div> loading...</div>
    }

  return (
    <div>
        <Appbar/>
        <div className='flex justify-center'>
            <div>
                {blogs.map (blog=>  <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={'23-July-2024'}
                />
                
                )}
               
                
            </div>
        </div>
    </div>
  )
}

export default Blogs