'use client'
import { useState } from "react";



export default function Form() {



    return (
        <>
            <div className="card bg-neutral md:w-1/2 w-full p-5 mt-10">
                <div
                    className="card mb-4 -mt-14 bg-primary grid p-6 place-items-center"
                >
                    <h3 className="text-white text-xl font-bold">
                        PDF GENERATOR
                    </h3>
                </div>
                <div className="lg:grid grid-cols-2 gap-2">
                    <div className="col-span-1 mb-1">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" id="name" className="input w-full border-0 focus:outline-none focus:border-2 input-primary" />
                    </div>

                    <div className="col-span-1 mb-1">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" id="name" className="input w-full border-0 focus:outline-none focus:border-2 input-primary" />
                    </div>
                    
                </div>


                <div className="mb-6">
                    <label className="label" htmlFor="pdf">PDF FILE</label>
                    <input type="file" id="pdf" accept="application/pdf" className="file-input w-full border-0 focus:outline-none focus:border-2 input-primary" />
                </div>

                <div className="mb-3">
                    <button className="btn btn-primary w-full" >Generate</button>
                </div>

            </div>
        </>
    )
}

