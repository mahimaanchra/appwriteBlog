import React from 'react';
import { Container, PostForm } from '../src/components/index';

function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <div className="bg-white border-2 border-black rounded-lg p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
          <h1 className="text-3xl font-black text-black mb-6 uppercase tracking-tighter">
            Create New Sticker
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;