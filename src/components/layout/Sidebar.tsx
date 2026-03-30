'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, FolderTree, Archive, User, 
  Github, Linkedin, Mail, Search,
  Sun, Moon, Menu, X, FilePlus
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'HOME', href: '/', icon: <Home className="w-4 h-4" /> },
  { label: 'CATEGORIES', href: '/categories', icon: <FolderTree className="w-4 h-4" /> },
  { label: 'ARCHIVES', href: '/archive', icon: <Archive className="w-4 h-4" /> },
  { label: 'ABOUT', href: '/about', icon: <User className="w-4 h-4" /> },
];

const SOCIAL_LINKS = [
  { icon: <Github className="w-5 h-5" />, href: 'https://github.com' },
  { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
  { icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@example.com' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[100] p-2 bg-primary text-white rounded-full lg:hidden shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[80] lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-full z-[90] bg-[#fafafa] border-r border-border transition-all duration-300 overflow-y-auto",
        "w-64 lg:w-[17.5rem]",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Profile Section */}
        <div className="flex flex-col items-center pt-16 pb-12 px-6">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-sm overflow-hidden mb-6 bg-slate-200">
            {/* Placeholder for User Profile Image */}
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <User className="w-12 h-12" />
            </div>
          </div>
          <Link href="/" className="text-center group">
            <h1 className="text-2xl font-black tracking-tighter text-primary group-hover:text-accent transition-colors uppercase">
              STUDY CASE
            </h1>
            <p className="text-[10px] font-bold text-secondary mt-2 uppercase tracking-[0.2em]">
              Analysis & Strategy Archive
            </p>
            <div className="mt-4 px-4 py-1.5 bg-muted rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
              Personal Portfolio
            </div>
          </Link>
        </div>

        {/* Global Search (Sidebar version) */}
        <div className="px-8 mb-10">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-slate-100/50 border border-transparent focus:bg-white focus:border-accent/30 pl-9 pr-4 py-2 rounded-full text-xs outline-none transition-all"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-6 flex-grow">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                  pathname === item.href 
                    ? "bg-primary text-white shadow-md shadow-primary/10" 
                    : "text-secondary hover:bg-slate-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* NEW: Write Button */}
          <div className="mt-8 px-2">
            <Link 
              href="/analysis/write"
              className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-accent hover:bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-accent/20 hover:shadow-none"
              onClick={() => setIsOpen(false)}
            >
              <FilePlus className="w-4 h-4" />
              <span>Create Analysis</span>
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto p-8 border-t border-slate-100">
          <div className="flex items-center justify-center gap-6 text-secondary mb-6">
            {SOCIAL_LINKS.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                title={social.href}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100">
            <button className="p-2 text-secondary hover:text-accent transition-colors" title="Toggle Search">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 text-secondary hover:text-accent transition-colors" title="Light/Dark Mode">
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
