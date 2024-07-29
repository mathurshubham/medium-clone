import { AvatarComponent } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-3">
        <div className="flex justify-center flex-col">
            Medium
        </div>
        <div>
            <AvatarComponent name="Shubham" size={"big"} />
        </div>
    </div>
}