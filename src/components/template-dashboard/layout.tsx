"use client";

import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";

interface LayoutProps {
  children: ReactNode;
}

type MenuState = "full" | "collapsed";

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [menuState, setMenuState] = useState<MenuState>("full");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [mobileMenuState, setMobileMenuState] =
    useState<MenuState>("collapsed");

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsMobile(!isDesktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenuState = () => {
    if (isMobile) {
      setMobileMenuState((prev) =>
        prev === "collapsed" ? "full" : "collapsed",
      );
    } else {
      setMenuState((prev) => (prev === "full" ? "collapsed" : "full"));
    }
  };

  const handleOutsideClick = () => {
    if (isMobile && mobileMenuState === "full") {
      setMobileMenuState("collapsed");
    }
  };

  const getMarginLeft = () => {
    if (isMobile) {
      return mobileMenuState === "collapsed" ? "4rem" : "0";
    }
    return menuState === "collapsed" ? "4rem" : `${sidebarWidth}px`;
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar
        menuState={menuState}
        mobileMenuState={mobileMenuState}
        isMobile={isMobile}
        sidebarWidth={sidebarWidth}
        onToggleMenuState={toggleMenuState}
        onSidebarWidthChange={setSidebarWidth}
        onMobileMenuStateChange={setMobileMenuState}
      />
      {isMobile && mobileMenuState === "full" && (
        <div
          className="fixed bg-black/30 z-65"
          onClick={handleOutsideClick}
          style={{
            pointerEvents: "auto",
            left: "16rem",
            top: "0",
            right: "0",
            bottom: "0",
          }}
        />
      )}
      <div
        className="w-full flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0"
        style={{
          marginLeft: getMarginLeft(),
        }}
      >
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] shrink-0">
          <TopNav onToggleMenu={toggleMenuState} />
        </header>
        <main className="flex-1 overflow-auto p-2 sm:p-6 bg-white dark:bg-[#0F0F12] min-w-0 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
