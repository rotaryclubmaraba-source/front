'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '4px solid #DEE2E6', borderTopColor: '#003F87', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!isAuthenticated) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F4FF' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh', padding: '32px 32px 48px' }}
        className="admin-main">
        {children}
      </main>
      <style>{`
        @media (max-width: 768px) { .admin-main { margin-left: 0 !important; padding: 72px 16px 32px !important; } }
      `}</style>
    </div>
  );
}
