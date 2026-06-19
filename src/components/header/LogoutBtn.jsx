import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            className="px-6 py-2 bg-white border-2 border-black font-bold text-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-400 transition-all duration-200"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;