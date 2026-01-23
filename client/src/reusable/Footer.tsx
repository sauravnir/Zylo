import React from "react"

import { PrimaryButton } from "./ButtonComponent"
import { Input } from "@/components/ui/input"
import { FOOTER_LINKS } from "@/objects/Objects"
import { Link } from "react-router-dom"

import { Copyright } from "lucide-react"
export function Footer (){
    return (
    
    <div className="relative overflow-hidden bg-muted/15 z-40 border">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 w-full py-6 md:py-14 px-2 md:px-10">
            {/* CTA Section  */}
            <div className="flex flex-col space-y-6 px-4">
                <h1 className="text-main text-menu font-normal uppercase ">Newsletter</h1>
                <p className="text-muted text-menu ">Sign up to our newsletter for early access to releases and more.</p>
                <div className="pr-6 space-y-6">
                <Input  
              className="text-menu placeholder:text-muted border border-muted/50 bg-transparent focus:bg-background focus:border-main rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-3 px-4"
              placeholder="E-mail"
              />

              <PrimaryButton isDisabled={false} name="Subscribe" />
                </div>
         
            
            </div>

            {/* Links Section */}
            {FOOTER_LINKS.map((item , key)=>(
                <div key={key} className="flex flex-col  space-y-6 px-4 mt-8 md:mt-0  md:ml-auto">
                    <h1 className="text-main text-menu font-normal uppercase ">{item.title}</h1>
                    <ul className="space-y-2"> 
                        {item.links.map((item)=>(
                            <li key={item.name} className="text-muted text-menu hover:text-main uppercase tracking-normal">
                                {item.href.startsWith("http") ? (
                                    <a 
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        
                                    >{item.name}</a>
                                ):
                                <Link to={item.href}>
                                    {item.name}
                                </Link>}

                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Bottom Section */}
            <div className="flex flex-row items-center md:items-start px-4 mt-14">
                <span className="flex gap-2 text-menu items-center text-muted uppercase "><Copyright size={12}/>{new Date().getFullYear()} - zylo</span>
            </div>
        </div>
    </div>)
}