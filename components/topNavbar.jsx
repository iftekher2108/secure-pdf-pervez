'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
export default function topNavbar() {

    return (
        <>

            <div className="navbar bg-primary px-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        {/* <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div> */}
                        {/* <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul> */}
                    </div>
                    <a className="btn btn-ghost text-xl">SECURE PDF GENERATOR</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {/* <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul> */}
                </div>
                <div className="navbar-end">
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-neutral">About</label>
                    </div>
                </div>
            </div>

            <div className="drawer drawer-end z-50">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}

                  <div className="flex flex-col justify-center items-center p-2 gap-2">
                    <Image src='/image/avatar.jpg' style={{ height: "140px", width: '140px' }} height={140} width={140} className="rounded-lg" alt="Creator Avatar" />

                    <div>
                      <span className="text-sm">Develop by -</span>
                      <h3 className="text-xl uppercase mt-2"><span className="iftekher font-extrabold bg-primary btn">Iftekher</span> <span className="bg-success font-extrabold btn">Mahmud</span></h3>
                    </div>
                    <span className="font-bold">Software Engineer</span>

                    <div className="text-sm">
                      <p>
                        <span className="text-primary font-bold">Portfolio: </span><a className="underline hover:text-primary" href="https://iftekher-mahmud.netlify.app" target="_blank"><span>iftekher-mahmud.netlify.app</span></a>
                      </p>
                      <p>
                        <span className="text-primary font-bold">Facebook: </span><a className="underline hover:text-primary" href="https://www.facebook.com/mdiftekher.mahmud" target="_blank"><span>MD Iftekher Mahmud</span></a>
                      </p>
                      <p>
                        <span className="text-primary font-bold">LinkedIn: </span><a className="underline hover:text-primary" href="https://www.linkedin.com/in/iftekhermahmud1/" target="_blank"><span>Iftekher Mahmud</span></a>
                      </p>
                      <p>
                        <span className="text-primary font-bold">Email: </span><a className="underline hover:text-primary" href="mailTo::iftekhermahmud1@gmail.com" target="_blank"><span>Iftekher Mahmud</span></a>
                      </p>



                    </div>
                    <div className="divider divider-primary">Iftekher Mahmud</div>
                    <div>
                      <p>Note: If you Find any Bug and Problem then picture of it and Send to Email.</p>
                    </div>

                  </div>


                </ul>
              </div>
            </div>

        </>

    );
}



