"use client"
import { Link } from 'react-scroll'
import React, { useState } from 'react';
import { TbCricket } from 'react-icons/tb';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter, usePathname } from 'next/navigation'

const Navbar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };
  const handleClick = () => {
    router.refresh();
    router.push('/auth');
  }
  const handleAdd = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.refresh();
      router.push('/addGig');
    } else {
      router.refresh();
      router.push('/auth');
    }
  }
  return (
    <div className=" fixed w-full">
      <div>
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className=" flex flex-row items-center cursor-pointer">
            <span>
              <TbCricket size={32} />
            </span>
            <h1 className=" text-xl font-semibold">CricStream</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Home
            </Link>



            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              About
            </Link>

            <Link
              to="menu"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Menu
            </Link>

            <Link
              to="review"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Reviews
            </Link>
            <div>
              <button className=" hover:text-brightColor transition-all cursor-pointer" onClick={handleAdd}>AddGig</button>
            </div>

            {
              currentPath != "/auth" && (
                <div>
                  <button className=" px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full" onClick={handleClick}>Login</button>
                </div>
              )
            }
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={` ${menu ? "translate-x-0" : "-translate-x-full"
            } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="menu"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            to="review"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Reviews
          </Link>
          <div>
            <button className=" hover:text-brightColor transition-all cursor-pointer" onClick={handleAdd}>AddGig</button>
          </div>
          {
            currentPath != "/auth" && (
              <div>
                <button className=" px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full" onClick={handleClick}>Login</button>
              </div>
            )
          }


        </div>
      </div>
    </div>
  )
}

export default Navbar