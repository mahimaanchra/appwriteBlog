import React, { useEffect, useState } from "react";
import appwriteService from "../src/appwrite/config";
import { Container, PostCard } from "../src/components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
  }, [authStatus]);

  // Reusable "Sticker" Message Box
  const MessageSticker = ({ text }) => (
    <div className="w-full py-20 flex justify-center">
      <div className="bg-white border-2 border-black p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black text-black">{text}</h1>
      </div>
    </div>
  );

  if (!authStatus) {
    return (
      <Container>
        <MessageSticker text="Login to read posts" />
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container>
        <MessageSticker text="No posts available. Create one! 🚀" />
      </Container>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
      <div className="bg-transparent border-none p-6">
          <div className="flex flex-wrap -m-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-4 w-full md:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;