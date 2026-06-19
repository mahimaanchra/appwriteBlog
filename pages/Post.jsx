import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../src/appwrite/config";
import { Container, Button } from "../src/components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full max-w-4xl mx-auto bg-white border-2 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                    {isAuthor && (
                        <div className="flex justify-end gap-3 mb-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-cyan-400">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-400" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                    <div className="w-full mb-8 border-2 border-black rounded-lg overflow-hidden flex justify-center">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-w-2xl object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl font-black mb-6 text-black leading-tight max-w-2xl">
                            {post.title}
                        </h1>
                        <div className="browser-css text-xl leading-relaxed font-medium text-black max-w-2xl text-left">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}