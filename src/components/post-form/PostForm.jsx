import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
    // 1. Handle File Upload
    const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

    if (post) {
        // If editing, delete old file only if a new one is uploaded
        if (file && post.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
        }
        
        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : post.featuredImage, // Keep old if no new one
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
        // 2. NEW POST: Strictly require a file
        if (file) {
            const dbPost = await appwriteService.createPost({ 
                ...data, 
                userId: userData.$id,
                featuredImage: file.$id // Crucial: This must match your DB attribute name
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // This prevents the 400 error by stopping the request before it hits the server
            alert("Please upload an image for your post!");
        }
    }
};
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    console.log("DEBUG - Post Object Content:", post);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full mb-4">
    <label className="inline-block mb-1 pl-1 font-black text-black">Featured Image :</label>
    <div className="w-full border-2 border-black rounded-lg bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <input
            type="file"
            className="w-full p-2 text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-2 file:border-black file:text-sm file:font-black file:bg-cyan-400 hover:file:bg-cyan-500 cursor-pointer"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
    </div>

                {post && post.featuredImage && typeof post.featuredImage === 'string' && post.featuredImage.length > 5 && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}