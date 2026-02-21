"use client";

import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAuthToken } from "@/hooks/useAuthToken";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { Button } from "../ui/button";

interface NavbarAuthButtonsProps {
  initialHasToken: boolean;
  initialUserInfo: UserInfo | null;
  initialDashboardRoute: string;
}

export default function NavbarAuthButtons({
  initialHasToken,
  initialUserInfo,
  initialDashboardRoute,
}: NavbarAuthButtonsProps) {
  // Detect client-side auth state changes on navigation
  const clientHasToken = useAuthToken();

  // Use client token state if available, otherwise fall back to server state
  const hasToken = clientHasToken || initialHasToken;
  const userInfo = hasToken ? initialUserInfo : null;
  const dashboardRoute = initialDashboardRoute;

  if (hasToken && userInfo) {
    return (
      <div className="flex items-center gap-3">
        <Link href={dashboardRoute}>
          <Button 
            variant="outline" 
            className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </Link>
        <UserDropdown userInfo={userInfo} />
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors">
        Login
      </Button>
    </Link>
  );
}
