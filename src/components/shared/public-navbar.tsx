import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import Link from "next/link";
import AISearchDialog from "./AISSearchDialog";
import MobileMenu from "./MobileMenu";
import { getCookie } from "@/services/auth/token-handlers";
import { getUserInfo } from "@/services/auth/get-user-info";
import NavbarAuthButtons from "./NavbarAuthButtons";

const PublicNavbar = async () => {
  const navItems = [
    { href: "/consultation", label: "Consultation" },
    { href: "/health-plans", label: "Health Plans" },
    { href: "/medicine", label: "Medicine" },
    { href: "/diagnostics", label: "Diagnostics" },
    { href: "/ngos", label: "NGOs" },
  ];

  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm shadow-sm dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            Doc
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              prefetch={true}
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <AISearchDialog />
          <NavbarAuthButtons
            initialHasToken={!!accessToken}
            initialUserInfo={userInfo}
            initialDashboardRoute={dashboardRoute}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          navItems={navItems}
          hasAccessToken={!!accessToken}
          userInfo={userInfo}
          dashboardRoute={dashboardRoute}
        />
      </div>
    </header>
  );
};

export default PublicNavbar;
