import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white border-2 border-black rounded-lg p-4 h-full flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all'>
      
        <div className='w-full mb-4 overflow-hidden rounded-md border-2 border-black'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='rounded-sm w-full h-40 object-cover' 
          />
        </div>

        <h2 className='text-xl font-black mb-2 line-clamp-2 h-14'>
          {title}
        </h2>

        <div className="mt-auto pt-4 border-t-2 border-black">
            <span className="text-sm font-bold text-gray-500">Read More →</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard