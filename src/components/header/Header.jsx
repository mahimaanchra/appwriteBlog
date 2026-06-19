import React from "react";
import { Link } from 'react-router-dom';
import { Logo, Container, LogoutBtn } from '../index';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
    { name: 'All Posts', slug: "/all-posts", active: authStatus },
    { name: 'Add Post', slug: "/add-post", active: authStatus }
  ];

  return (
    <header className="py-4 bg-[#00bfff] border-b-4 border-black sticky top-0 z-50">
      <Container>
        <nav className="flex items-center">
          <div className="mr-6">
            <Link to='/'>
              <Logo width='60px' />
            </Link>
          </div>
          <ul className="flex ml-auto items-center gap-2">
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                  className="px-6 py-2 bg-white border-2 border-black font-bold text-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffdb58] transition-all duration-200"
                  onClick={() => navigate(item.slug)}
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;