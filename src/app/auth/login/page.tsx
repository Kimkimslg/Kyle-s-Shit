'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // TODO: Firebase integration
    alert('로그인에 성공했습니다! (MVP 데모)');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-border p-10 rounded-2xl shadow-xl shadow-primary/5">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-black tracking-tighter text-primary uppercase">INSIGHT ARCHIVE</h1>
            <p className="mt-2 text-sm text-secondary font-medium">계속하려면 로그인하세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
            >
              로그인 <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-secondary">
            계정이 없으신가요?{' '}
            <Link href="/auth/signup" className="text-accent font-bold hover:underline">회원가입</Link>
          </p>
        </div>
        
        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-400 font-medium">
          <Link href="/terms" className="hover:text-primary transition-colors">이용약관</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
        </div>
      </div>
    </div>
  );
}
