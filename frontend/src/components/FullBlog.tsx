import { Blog } from "../hooks"
import { Appbar } from "./Appbar"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return <div>
        <Appbar/>
        <div className="grid grid-cols-12 px-10 w-full pt-200">
            <div className="grid-cols-8 bg-red-200">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="">
                    {blog.content}
                </div>
            </div>
            <div className="grid-cols-4 bg-green-200">
                hello
            </div>
        </div>
    </div>
}