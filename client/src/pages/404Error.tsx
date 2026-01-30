import { Link } from "react-router-dom";

export function Error404() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-card px-4">
      <h1 className="text-main text-display-spaced uppercase font-bold tracking-widest">404</h1>
      <p className="text-muted text-sm mt-2">
        The page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className=" mt-6 text-[11px] uppercase font-bold border-b-2 border-main pb-1 hover:text-muted transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}