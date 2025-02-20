import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  User,
  CalendarRange,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: CalendarRange, label: "Menu", href: "/menu" },
];

export default function Navigation() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  return (
    <nav className="w-64 border-r bg-sidebar p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Chef's Hub</h1>
      </div>

      <div className="space-y-2 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                location === href && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Button>
          </Link>
        ))}
      </div>

      <Button
        variant="ghost"
        className="justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={() => logoutMutation.mutate()}
      >
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </nav>
  );
}
