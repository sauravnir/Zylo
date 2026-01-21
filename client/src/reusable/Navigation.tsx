import React from "react";
import Logo from "../assets/logo/Logo.png"
import { Link } from "react-router-dom";



// Menu Items
const menuItems = [
    {title:"New", link:"/"},
    {title:"Basics", link:"/"},
    {title:"Shop", link:"/"}
]

const cta = [
    {title:"INR", link:"/"},
    {title:"Search", link:"/"},
    {title:"Haina hola", link:"/"}
]
export default function NavigationBar(){
    return (
        <div className="fixed w-full z-10">
            <div className="flex justify-between items-center h-20 bg-background border px-4 md:px-8">
                {/* Logo Component */}
                <div className="flex-shrink-0">
                    <Link to="/">
                        <img src={Logo} alt="Zylo" className="h-36 w-auto"/>
                    </Link>         
                </div>
                {/* Menu Items */}
                <div className="font-body text-menu text-primary"> 
                    {menuItems.map((item)=>(
                        <Link key={item.title} to={item.link} className="mx-4 uppercase hover:text-muted">
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className="font-body text-menu text-muted"> 
                    {cta.map((item)=>(
                        <Link key={item.title} to={item.link} className="mx-4 uppercase hover:text-primary">
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}