import { getCookie } from "@/services/auth/token-handlers";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./logout-button";

const PublicNavbar = async () => {
  const navItems = [
    { href: "#", label: "Consultation" },
    { href: "#", label: "Health Plans" },
    { href: "#", label: "Medicine" },
    { href: "#", label: "Diagnostics" },
    { href: "#", label: "NGOs" },
  ];

  const accessToken = await getCookie("accessToken");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">E-Doctor</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button className="rounded-lg px-6 py-2 font-semibold shadow-md hover:shadow-lg">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border pt-6 flex flex-col space-y-4">
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login" className="w-full">
                      <Button className="w-full rounded-lg font-semibold">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
