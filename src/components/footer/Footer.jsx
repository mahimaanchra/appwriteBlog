import React from "react";
import { Link } from 'react-router-dom';
import { Logo } from '../index';

function Footer() {
  return (
    <footer className="relative py-10 bg-[#00bfff] border-t-4 border-black">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">
                  &copy; Copyright 2026. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          
          {/* Reusable list component could be used here, but we will style these manually for the effect */}
          {[
            { title: "Company", links: ["Features", "Pricing", "Affiliate Program", "Press Kit"] },
            { title: "Support", links: ["Account", "Help", "Contact Us", "Customer Support"] },
            { title: "Legals", links: ["Terms & Conditions", "Privacy Policy", "Licensing"] }
          ].map((section) => (
            <div key={section.title} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="mb-6 text-xs font-black uppercase text-black">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link} className="mb-4">
                    <Link
                      className="text-base font-bold text-white hover:text-black transition-colors"
                      to="/"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;