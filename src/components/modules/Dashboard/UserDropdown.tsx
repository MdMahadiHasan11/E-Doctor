"use client";

// import LogoutButton from "@/components/shared/logout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logout-user";
import { UserInfo } from "@/types/user.interface";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  const userInitials = userInfo.name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-10 w-10 bg-primary/10 hover:bg-primary/20 text-primary font-semibold border border-primary/20 transition-colors"
        >
          {userInitials}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 shadow-lg">
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-bold text-foreground">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full capitalize">
                {userInfo.role.toLowerCase()}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/my-profile"} className="flex items-center">
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/change-password"} className="flex items-center">
            <Settings className="mr-2 h-4 w-4 text-primary" />
            <span>Change Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
