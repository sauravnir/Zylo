import { PrimaryButton } from "./ButtonComponent";
import { Input } from "@/components/ui/input";
import { FOOTER_LINKS } from "@/objects/Objects";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { Copyright } from "lucide-react";
import type { RootState } from "@/store/store";
import { setIsUploading } from "@/store/slices/cartSlice";
import { useState } from "react";

export function Footer() {
  const isUploading = useAppSelector(
    (state: RootState) => state.cart.isUploading,
  );
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const dispatch = useAppDispatch();
  const handleNewsletterSubmission = async () => {
    if (!email && !email.includes("@")) return;
    dispatch(setIsUploading(true));
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(setIsUploading(false));
    setIsSubscribed(true);
  };

  return (
    <div className="relative overflow-hidden bg-muted/15  border-1 border-main">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 w-full py-6 md:py-14 px-2 md:px-10">
        {/* CTA Section  */}
        <div className="flex flex-col space-y-6 px-4">
          <h1 className="text-main text-menu font-normal uppercase ">
            Newsletter
          </h1>
          <p className="text-muted text-small tracking-tighter">
            Sign up to our newsletter for early access to releases and more.
          </p>
          {!isSubscribed ? (
            <div className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-menu placeholder:text-muted border border-muted/50 bg-transparent focus:bg-background focus:border-main rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-3 px-4"
                placeholder="E-mail"
                disabled={isUploading}
                required
              />

              <PrimaryButton
                onClick={handleNewsletterSubmission}
                isDisabled={isUploading}
                name={isUploading ? "Submitting..." : "Subscribe"}
              />
            </div>
          ) : (
            <div className="py-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-main font-medium tracking-wide">
                Thank you for joining.
              </p>
             
              <button
                onClick={() => setIsSubscribed(false)}
                className="text-sm tracking-wide uppercase underline hover:text-main/70 transition-colors duration-300"
              >
                Sign up another email
              </button>
            </div>
          )}
        </div>

        {/* Links Section */}
        {FOOTER_LINKS.map((item, key) => (
          <div
            key={key}
            className="flex flex-col  space-y-6 px-4 mt-8 md:mt-0  md:ml-auto"
          >
            <h1 className="text-main text-menu font-main uppercase ">
              {item.title}
            </h1>
            <ul className="space-y-2">
              {item.links.map((item) => (
                <li
                  key={item.name}
                  className="text-muted text-menu hover:text-main transition-colors duration-300 uppercase tracking-normal"
                >
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.href}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Bottom Section */}
      <div className="flex flex-row items-center md:items-start justify-between px-12 mt-2 pb-4 ">
        <span className="flex gap-2 text-menu items-center text-muted uppercase ">
          <Copyright size={12} />
          {new Date().getFullYear()} - zylo{" "}
        </span>
        <span className="flex gap-2 text-menu items-center text-muted uppercase ">
          Powered by{" "}
          <Link
            to="https://www.instagram.com/sauravvn/"
            target="_blank"
            className="underline hover:text-main transition-colors duration-300"
          >
            SauravvN
          </Link>
        </span>
      </div>
    </div>
  );
}
