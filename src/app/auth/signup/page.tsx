'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', { name, email, password });
    // TODO: Firebase integration
    alert('회원가입이 완료되었습니다! (MVP 데모)');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-border p-10 rounded-2xl shadow-xl shadow-primary/5">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-black tracking-tighter text-primary uppercase">INSIGHT ARCHIVE</h1>
            <p className="mt-2 text-sm text-secondary font-medium">새로운 계정을 만드세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm"
                  placeholder="홍길동"
                  required
                />
              </div>
            </div>

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
              회원가입 <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-secondary">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="text-accent font-bold hover:underline">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
