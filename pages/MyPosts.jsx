import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../src/components/index"; 
import appwriteService from "../src/appwrite/config";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData?.$id) {
            appwriteService.getPosts([Query.equal("userId", userData.$id)]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [userData]); 

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-2xl font-bold text-gray-600">
                        You haven't created any posts yet!
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;