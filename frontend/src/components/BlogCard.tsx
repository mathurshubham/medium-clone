import { Link } from "react-router-dom";

export interface BlogCardProps{
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
            <div className="flex">
                    <AvatarComponent name={authorName}/> 
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col"> 
                    {authorName} 
                </div> 
                <div className="text-xs flex justify-center flex-col pl-2 flex justify-center flex-col"> 
                    <Circle /> 
                </div>
                <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>

            <div className="text-xl font-semibold pt-2 cursor-pointer">
                {title}
            </div>
            <div className="text-md font-thin cursor-pointer">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}


export function AvatarComponent ({name, size = "small"}: { name: string, size?: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${ size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-300`}>
        {getInitials(name)}
    </span>
</div>
}

function getInitials(fullName: string) {
    const names = fullName.split(" ");
  
    const initials = names.map(name => name[0].toUpperCase()).join("");
  
    return initials;
  }