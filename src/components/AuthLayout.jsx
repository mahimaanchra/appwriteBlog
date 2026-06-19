import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader , setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }else{
        setLoader(false)
        }
    } , [authStatus , navigate , authentication])
    return loader ? 
   (
        <div className="w-full text-center py-8">
            <h1 className="text-2xl text-black font-bold">Loading layout security...</h1>
        </div>
    ) : (
        <>{children}</>);
}
