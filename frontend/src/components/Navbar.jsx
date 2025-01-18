import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import ModdleToggle from "./ModdleToggle";

function Navbar() {
  const user = true;
  const navigate = useNavigate();

  return (
    <>
      <DesktopNavbar user={user} navigate={navigate} />
      <MobileNavbar user={user} navigate={navigate} />
    </>
  );
}

export default Navbar;

function DesktopNavbar({ user, navigate }) {
  return (
    <nav className="w-full fixed top-0 left-0 z-10  bg-opacity-70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between shadow-md">
        <Link
          to="/"
          className="font-mono tracking-wider text-xl font-bold text-gray-800"
        >
          Course
        </Link>
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <DropdownMenu asChild>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to={"/my-courses"}> My Courses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigate("/login")}
                    variant="secondary"
                  >
                    Sign up
                  </Button>
                  <Button onClick={() => navigate("/login")}>Login</Button>
                </div>
              </>
            )}
            <ModdleToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNavbar({ user, navigate }) {
  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl  mx-auto px-2 border-b py-4 shadow flex items-center justify-between">
        <Link to="/" className="font-mono tracking-wider text-xl font-bold">
          Course
        </Link>
        <div className="flex items-center ">
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to={"/my-courses"}>My Courses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigate("/login")}
                    variant="secondary"
                  >
                    Sign up
                  </Button>
                  <Button onClick={() => navigate("/login")}>Login</Button>
                </div>
              </>
            )}
            <ModdleToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
