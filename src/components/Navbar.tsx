import React from "react";
import { DUMMY_USER } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpenIcon,
  CompassIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";

const Navbar = () => {
  const { user } = { user: DUMMY_USER };

  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const [previousPathname, setPreviousPathname] = React.useState(pathname);

  // Close dropdown when the route changes
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!open) return;

    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [open]);

  const isInstructor = user?.role === "instructor" || user?.role === "admin";

  const navLink = (path: string, label: string) => {
    return (
      <Link to={path} className="nav-link">
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-2xl font-medium">
          <img className="h-7" src="/logo.svg" alt="Logo" />

          <p>GreatSkills</p>
        </Link>

        {/* Navigation */}
        {user && (
          <nav className="hidden sm:flex items-center gap-1">
            {navLink("/courses", "Courses")}
            {navLink("/my-learning", "My Learning")}
            {isInstructor && navLink("/instructor", "Instructor Panel")}
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {user ? (
            <div ref={menuRef} className="relative">
              {/* Avatar */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium hover:bg-zinc-800 transition-colors"
                aria-label="User menu"
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="dropdown-menu">
                  {/* User Information */}
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {user.name}
                    </p>

                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1.5">
                    <Link to="/courses" className="sm:hidden dropdown-item">
                      <CompassIcon className="w-3.5 h-3.5 text-secondary/45" />
                      Courses
                    </Link>

                    <Link to="/my-learning" className="sm:hidden dropdown-item">
                      <BookOpenIcon className="w-3.5 h-3.5 text-secondary/45" />
                      My Learning
                    </Link>
                    {isInstructor && (
                      <Link
                        to="/instructor"
                        className="sm:hidden dropdown-item"
                      >
                        <LayoutDashboardIcon className="w-3.5 h-3.5 text-secondary/45" />
                        Instructor Panel
                      </Link>
                    )}
                  </div>

                  {/* Sign Out */}
                  <div className="p-1.5 border-t border-zinc-100">
                    <button type="button" className="dropdown-item-danger">
                      <LogOutIcon className="w-3.5 h-3.5 text-rose-500" />

                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Sign In */}
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Sign In
              </button>

              {/* Get Started */}
              <button type="button" className="btn-primary-sm">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
