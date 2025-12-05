'use client';
import Marquee from "react-fast-marquee";
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
        <div className="flex  justify-center ">
            <Marquee autoFill className="bg-[#204b74] font-bold text-white p-2">
                <p className="text-xl mx-2">One Student.</p>
                <p className="text-xl mx-2">One Tree.</p>
                <p className="text-xl mx-2">One Future.</p>
            </Marquee>
        </div>
        <div className="header-container flex items-center justify-between shadow px-10 bg-white relative z-50 w-full py-3">
            {/* logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
            <Image src={"/logo.png"} alt="logo" width={120} height={100}/>
                
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
                <Link href="/login" className="border-[#204b74] border-2 px-6 py-2 text-[#204b74] rounded-full hover:bg-[#204b74] hover:text-white transition-all duration-300">Login</Link>
                <Link href="/register" className="bg-[#204b74] text-white px-6 py-2 rounded-full hover:bg-[#204b74] transition-all duration-300 shadow-lg">Join Now</Link>
            </div>


        </div>
        
        </>
    )
}

