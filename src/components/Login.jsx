import React , {useState} from "react";
import {Link , useNavigate} from 'react-router-dom';
import {login as authLogin} from '../../store/authSlice';
import {Button , Input , Logo} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import {useForm} from "react-hook-form";

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register , handleSubmit} = useForm();
    const [error , setError] = useState("");
    
  const login = async(data) => {
    setError("");
    console.log("=== LOGIN PROCESS STARTED ===");
    console.log("Form data submitted:", data);
    
    try {
        console.log("1. Attempting Appwrite authService.login...");
        const session = await authService.login(data);
        console.log("Appwrite session result:", session);
        
        if (session) {
            console.log("2. Fetching current user details...");
            const userData = await authService.getCurrentUser();
            console.log("Raw Appwrite userData received:", userData);
            
            if (userData) {
                console.log("3. Cleaning userData for Redux...");
                const cleanUserData = JSON.parse(JSON.stringify(userData));
                console.log("Cleaned userData object:", cleanUserData);
                
                console.log("4. Dispatching to Redux store now...");
                dispatch(authLogin({ userData: cleanUserData }));
                console.log("Redux dispatch line completed!");
                
                console.log("5. Triggering navigate to home page...");
                navigate("/");
                console.log("Navigate line executed!");
            } else {
                console.log("❌ userData came back empty or undefined!");
            }
        } else {
            console.log("❌ Appwrite session was not created successfully!");
        }
    } catch (error) {
        console.log("💥 CRASH DETECTED IN TRY/CATCH BLOCK!");
        console.error("The exact error message is:", error.message);
        console.error("Full error stack:", error);
        setError(error.message);
    } 
}

    return(
        <div className="flex items-center justify-center w-full">
           <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
         </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label = "Email: " 
                placeholder = "Enter your email"
                type = "email"
                {...register("email" , {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                    }
                })}
                />
                 <Input
                label = "Password: " 
                placeholder = "Enter your password"
                type = "password"
                {...register("password" , {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full">Login</Button>
            </div>
        </form>
        </div>
        </div>
    )
}

export default Login;