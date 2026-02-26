"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  Eye, 
  Cpu, 
  Users, 
  LogOut, 
  Menu, 
  X,
  TrendingUp,
  ShieldCheck,
  Building2,
  Bitcoin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: ('admin' | 'investor')[];
}

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['investor'] },
  { title: 'Investments', href: '/dashboard/investments', icon: TrendingUp, roles: ['investor'] },
  { title: 'History', href: '/dashboard/history', icon: History, roles: ['investor'] },
  { title: 'Watchlist', href: '/dashboard/watchlist', icon: Eye, roles: ['investor'] },
  { title: 'AI Insights', href: '/dashboard/ai', icon: Cpu, roles: ['investor'] },
  { title: 'Admin Console', href: '/admin', icon: ShieldCheck, roles: ['admin'] },
  { title: 'User Management', href: '/admin/users', icon: Users, roles: ['admin'] },
  { title: 'Balance Requests', href: '/admin/balances', icon: Wallet, roles: ['admin'] },
];

export function DashboardLayout({ children, role = 'investor' }: { children: React.ReactNode, role?: 'admin' | 'investor' }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeUser = {
    name: role === 'admin' ? 'System Administrator' : 'Jane Doe',
    email: role === 'admin' ? 'admin@apexvest.com' : 'jane@example.com',
    initials: role === 'admin' ? 'SA' : 'JD'
  };

  const filteredNavItems = NAV_ITEMS.filter(item => item.roles.includes(role));

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transition-transform duration-300 transform lg:relative lg:translate-x-0 flex flex-col shadow-2xl",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="text-primary h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">ApexVest</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 group",
                  isActive ? "bg-accent text-primary font-semibold shadow-md" : "text-white/70"
                )}>
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-white/50 group-hover:text-white")} />
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar className="h-10 w-10 border-2 border-accent">
              <AvatarFallback className="bg-accent text-primary font-bold">{activeUser.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">{activeUser.name}</span>
              <span className="text-xs text-white/50 truncate">{activeUser.email}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 mt-2 gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b bg-white shadow-sm z-30">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">Current Portfolio Value</span>
            <span className="text-lg font-bold text-primary ml-2">$1,154,200.00</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                <Bitcoin className="h-3 w-3" /> BTC +2.4%
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                <Building2 className="h-3 w-3" /> RE +0.8%
              </div>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarImage src={`https://picsum.photos/seed/user1/100/100`} />
              <AvatarFallback>{activeUser.initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}