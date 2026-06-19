import React from "react";

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500', 
    textColor = 'text-black', 
    className = '',
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`
                px-6 py-3 
                font-black 
                border-2 border-black 
                rounded-lg 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                active:shadow-none 
                active:translate-x-0.5
                active:translate-y-0.5 
                hover:bg-opacity-90 
                transition-all 
                ${bgColor} ${textColor} ${className}
            `} 
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;