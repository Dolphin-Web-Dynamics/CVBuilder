"use client";
import Link from "next/link";
import { Menu, FileText, User, Settings, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  title?: string;
  buttonTitle?: string;
  buttonLink?: string;
  routes?: { name: string; path: string }[];
  className?: string;
}

export function Navbar({
  title = "Resume Builder",
  buttonTitle = "Create Resume",
  buttonLink = "/builder",
  routes = [],
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <MobileNav
              title={title}
              routes={routes}
              buttonTitle={buttonTitle}
              buttonLink={buttonLink}
            />
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{title}</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path ?? "#"}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-start gap-4">
          <Link href={buttonLink ?? "#"} className="hidden md:block">
            <Button>{buttonTitle}</Button>
          </Link>
          <UserNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ title, routes, buttonTitle, buttonLink }: NavbarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="px-2">
          <Link href="/" className="flex items-center gap-2 py-4">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{title}</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-4 px-2">
          {routes?.map((route) => (
            <SheetClose asChild key={route.path}>
              <Link
                href={route.path}
                className="flex py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {route.name}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href={buttonLink ?? "#"} className="mt-4">
              <Button className="w-full">{buttonTitle}</Button>
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>My Resumes</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
