"use client";

import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard, Menu} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import AISearchDialog from "./AISSearchDialog";

interface MobileMenuProps {
  navItems: Array<{ href: string; label: string }>;
  hasAccessToken: boolean;
  userInfo?: UserInfo | null;
  dashboardRoute?: string;
}

const MobileMenu = ({
  navItems,
  hasAccessToken,
  userInfo,
  dashboardRoute,
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 active:scale-95 transition-transform"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-70 sm:w-87.5 p-0 bg-background border-l"
        >
          <div className="flex items-center justify-between p-4.5 border-b">
            <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button> */}
          </div>

          <nav className="flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
            {/* Navigation Items */}
            <div className="px-4 py-6 space-y-2">
              {navItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors active:bg-primary/20"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t my-4" />

            {/* Search and Auth Section */}
            <div className="px-4 py-6 space-y-4 flex-1 flex flex-col">
              <div className="w-full">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tools</p>
                <AISearchDialog />
              </div>

              {/* Auth Actions */}
              <div className="border-t pt-6 space-y-3 mt-auto">
                {hasAccessToken && userInfo ? (
                  <>
                    <Link href={dashboardRoute || "/"} onClick={closeMenu}>
                      <Button 
                        className="w-full gap-2 justify-start pl-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                      </Button>
                    </Link>
                    <div className="pt-2 border-t">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Account</p>
                      <div className="flex justify-center">
                        <UserDropdown userInfo={userInfo} />
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href="/login" onClick={closeMenu} className="w-full">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
