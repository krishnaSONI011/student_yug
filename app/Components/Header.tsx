'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header(){
    const pathname = usePathname();
    
    // Don't show header on dashboard routes
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }
    
    const links = [
        {
            link:"/" , name:"Home"
        } ,
        {
            link:"/#features" , name:"Features"
        },
        {
            link:"/#pillars" , name:"Our Pillars"
        },
        {
            link:"/#impact" , name:"Impact"
        },
        {
            link:"/#contact" , name:"Contact Us"
        }
    ]
    return(
        <>
        {/* Top Bar */}
        <div className="header-container flex items-center justify-between shadow px-10 bg-white relative z-50 w-full py-3">
            {/* logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
                <Image src={"/fina.jpg"} width={120} height={100} alt="StudentYug Logo" className="rounded-full" />
                <div>
                    <h1 className="text-2xl font-bold text-[#1c756b]">StudentYug , Never End</h1>
                    <p className="text-xs text-gray-600">One Student, One Tree, One Sport</p>
                </div>
            </Link>

            <div>
                <ul className="flex gap-10 capitalize">
                    {
                        links.map((link , index)=>(
                            <Link 
                                key={index} 
                                href={link.link}
                                className="text-gray-700 hover:text-[#1c756b] transition-colors duration-300 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))
                    }
                   
                </ul>
            </div>

            <div className="flex gap-5 ">
                <Link href="/login" className="border-[#1c756b] border-2 px-6 py-2 text-[#1c756b] rounded-full hover:bg-[#1c756b] hover:text-white transition-all duration-300">Login</Link>
                <Link href="/register" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#155e56] transition-all duration-300 shadow-lg">Join Now</Link>
            </div>


        </div>
        
        </>
    )
}

