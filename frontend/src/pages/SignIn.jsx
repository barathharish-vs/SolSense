import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Demonstration flow: simulate authentication delay and transition to Dashboard
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-surface">
      {/* Left Side: Immersive Brand Panel (Matches Stitch sign_in_solsense) */}
      <div className="lg:w-1/2 bg-primary-container text-on-primary-container p-space-xl lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative background blur circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-fixed/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none"></div>

        {/* Top Branding */}
        <div className="flex items-center gap-space-md z-10">
          <div className="w-10 h-10 rounded-xl bg-on-primary-container/10 flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-on-primary-container text-[24px] fill-1">
              solar_power
            </span>
          </div>
          <span className="text-headline-md font-headline-md tracking-tight uppercase text-on-primary">
            SolSense
          </span>
        </div>

        {/* Center Content: Tagline & Editorial Statement */}
        <div className="my-auto py-space-xl z-10 max-w-xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-on-primary-container/10 text-on-primary-container text-label-md mb-space-lg backdrop-blur-md">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Enterprise Solar Intelligence</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-primary mb-space-md tracking-tight">
            Intelligent Solar Monitoring. Smarter Energy Decisions.
          </h1>
          <p className="text-body-lg text-on-primary-container/90 font-body-lg">
            Unleash the full potential of your photovoltaic infrastructure with real-time AI analytics, automated fault detection, and predictive yield optimization.
          </p>
        </div>

        {/* Bottom Testimonial / Stat Card */}
        <div className="z-10 bg-surface/10 backdrop-blur-xl p-space-lg rounded-xl shadow-xl border border-white/10">
          <div className="flex items-center gap-space-md mb-space-md">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container border border-white/20">
              <img
                className="w-full h-full object-cover"
                alt="Dr. Elena Rostova"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
              />
            </div>
            <div>
              <div className="text-label-lg font-label-lg text-on-primary">Dr. Elena Rostova</div>
              <div className="text-body-sm text-on-primary-container/80">VP of Operations, Global Solar Networks</div>
            </div>
          </div>
          <p className="text-body-md text-on-primary/90 italic mb-space-md">
            "SolSense transformed our portfolio oversight. We achieved an immediate 34% boost in energy optimization across our 1,200 commercial solar plants."
          </p>
          <div className="flex items-center justify-between pt-space-md border-t border-on-primary-container/10">
            <div className="flex items-center gap-space-xs text-on-primary-fixed">
              <span className="material-symbols-outlined text-tertiary-fixed text-[20px] fill-1">bolt</span>
              <span className="text-headline-sm text-on-primary font-headline-sm">+34% Optimization</span>
            </div>
            <span className="text-label-sm text-on-primary-container/70">1,200+ Plants Managed</span>
          </div>
        </div>
      </div>

      {/* Right Side: Authentication Panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-space-xl lg:p-24 bg-surface">
        <div className="w-full max-w-md">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-surface-container rounded-xl mb-space-xl">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-space-sm text-center rounded-lg text-label-lg font-label-lg transition-all ${
                activeTab === 'signin'
                  ? 'bg-surface text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-space-sm text-center rounded-lg text-label-lg font-label-lg transition-all ${
                activeTab === 'signup'
                  ? 'bg-surface text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Header */}
          <div className="mb-space-lg">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-space-xs">
              {activeTab === 'signin' ? 'Welcome back' : 'Start Your Journey'}
            </h2>
            <p className="text-body-md text-on-surface-variant">
              {activeTab === 'signin'
                ? 'Enter your credentials to access your solar portfolio dashboard.'
                : 'Join enterprise solar managers achieving peak array yields.'}
            </p>
          </div>

          {/* Demonstration Notice */}
          <div className="mb-4 p-2.5 rounded-lg bg-surface-container text-xs text-on-surface-variant border border-surface-container-high flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">info</span>
            <span>Frontend prototype mode: Click below to sign in directly without real credentials.</span>
          </div>

          {/* Auth Form */}
          <form className="space-y-space-md" onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <div className="space-y-space-xs">
                <label className="block text-label-md text-on-surface font-label-md">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </span>
                  <input
                    className="w-full pl-12 pr-space-md py-space-md bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-body-md"
                    placeholder="Alex Morgan"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-space-xs">
              <label className="block text-label-md text-on-surface font-label-md">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <input
                  className="w-full pl-12 pr-space-md py-space-md bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-body-md"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <label className="block text-label-md text-on-surface font-label-md">Password</label>
                {activeTab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset is mocked for UI demonstration.')}
                    className="text-label-md text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </span>
                <input
                  className="w-full pl-12 pr-space-md py-space-md bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-body-md"
                  placeholder="••••••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-space-xs">
              <label className="flex items-center gap-space-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeTab === 'signin' ? rememberMe : termsAgreed}
                  onChange={(e) =>
                    activeTab === 'signin' ? setRememberMe(e.target.checked) : setTermsAgreed(e.target.checked)
                  }
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-body-sm text-on-surface-variant">
                  {activeTab === 'signin' ? 'Remember this device' : 'I agree to the Terms of Service & Privacy Policy'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-surface-tint text-on-primary py-space-md rounded-xl text-label-lg font-label-lg shadow-sm transition-all flex items-center justify-center gap-space-sm cursor-pointer disabled:opacity-75"
            >
              <span>{isSubmitting ? 'Accessing Dashboard...' : activeTab === 'signin' ? 'Sign In to SolSense' : 'Create Free Account'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-space-xl pt-space-lg border-t border-surface-container text-center">
            <p className="text-body-sm text-on-surface-variant flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
              Protected by 256-bit enterprise telemetry encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
