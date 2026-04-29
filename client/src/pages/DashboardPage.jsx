import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-max py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">
            Real Estate Diaspora
          </h1>
          <button
            onClick={handleLogout}
            className="btn-secondary px-4 py-2"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-max py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="md:col-span-2 card">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, {user?.name}!
            </h2>
            <p className="text-gray-600">
              You are logged in as <strong>{user?.email}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Role: <span className="font-semibold text-primary-600">{user?.role}</span>
            </p>
          </div>

          {/* User Info Card */}
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3">Profile</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-gray-500">Name</dt>
                <dd className="text-gray-800 font-medium">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="text-gray-800 font-medium">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Role</dt>
                <dd className="text-gray-800 font-medium capitalize">{user?.role}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Properties */}
          <div className="card cursor-pointer hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Properties</h3>
            <p className="text-sm text-gray-600">Browse real estate opportunities</p>
          </div>

          {/* Investments */}
          <div className="card cursor-pointer hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">My Investments</h3>
            <p className="text-sm text-gray-600">Track your investment portfolio</p>
          </div>

          {/* Support */}
          <div className="card cursor-pointer hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Support</h3>
            <p className="text-sm text-gray-600">Get help from our support team</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 card bg-primary-50 border-l-4 border-primary-600">
          <h3 className="font-semibold text-primary-900 mb-2">🎉 Welcome to Real Estate Diaspora</h3>
          <p className="text-primary-800 text-sm">
            You have successfully logged in. Start exploring investment opportunities and managing your portfolio.
          </p>
        </div>
      </main>
    </div>
  );
}
