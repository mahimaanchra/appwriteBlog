import React from 'react';
import logoImg from './logo.webp'; 

export default function Logo({ width = '100px' }) {
  return (
    <img 
      src={logoImg} 
      alt="Logo" 
      style={{ width: width }} 
      className="object-contain" 
    />
  );
}