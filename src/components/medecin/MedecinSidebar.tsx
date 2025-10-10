"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { navigationItems } from "./config/navigation";
import { useUserContext } from "@/providers/UserProvider";
import LogOutForm from "../auth/LogOutForm";

export default function MedecinSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUserContext()

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="shadow-lg"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 h-full bg-background border-r flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
      `}>
        {/* Header */}
        <div className="mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">MedEasy</h1>
                <p className="text-xs text-muted-foreground">Portal Médecin</p>
              </div>
            </div>
            
            {/* Toggle Button - Desktop only */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex hover:bg-muted"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-auto transition-all duration-300 ${
                    isCollapsed 
                      ? 'p-3 justify-center' 
                      : 'p-3'
                  } ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                    }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <div className="text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t px-4 pb-4">
          <div className="space-y-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCheck className="h-4 w-4" />
                <span>Dr. {user?.prenom} {user?.nom}</span>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <LogOutForm />
          </div>
        </div>
      </div>
    </>
  );
}



