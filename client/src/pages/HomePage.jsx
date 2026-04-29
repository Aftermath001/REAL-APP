import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-max py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">
            Real Estate Diaspora
          </h1>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary"
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-5xl font-bold mb-6">
            Invest in Real Estate Globally
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Connect with premium real estate investment opportunities across the globe. Perfect for diaspora investors looking to diversify their portfolio.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Investing Today
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Verified Properties</h4>
              <p className="text-gray-600">All properties are thoroughly vetted and verified by our team</p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Transparent Pricing</h4>
              <p className="text-gray-600">Clear fees with no hidden charges. Know exactly what you're investing</p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h4>
              <p className="text-gray-600">Our dedicated support team is always available to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-max text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your Investment Journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of diaspora investors who are building wealth through real estate.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Create Account Now
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 border-t border-gray-700">
        <div className="container-max text-center text-sm">
          <p>&copy; 2026 Real Estate Diaspora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
