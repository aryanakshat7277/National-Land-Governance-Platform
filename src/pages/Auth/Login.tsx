import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Map, Shield, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAssetUrl } from '@/utils/assets';

const roleOptions = [
  { value: 'public', label: '🌐 Public User', desc: 'Browse & search repository' },
  { value: 'researcher', label: '🔬 Researcher / Academic', desc: 'Upload & collaborate' },
  { value: 'official', label: '🏛️ Government Official', desc: 'Policy tools & dashboards' },
  { value: 'admin', label: '⚙️ Platform Admin', desc: 'Full access' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('researcher');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Login successful! Welcome back.');
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gov-light flex">
      {/* Left panel — branding with Real Drone & Satellite Photography */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 bg-[#1A5276] flex-col justify-between p-10 text-white relative overflow-hidden">
        {/* Background photo overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/images/drone_cadastral_survey.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A5276]/95 via-[#1A5276]/90 to-[#2471A3]/85 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#1A5276]" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" stroke="#1A5276" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="2.5" fill="#1A5276" />
                <line x1="12" y1="2" x2="12" y2="22" stroke="#1A5276" strokeWidth="1" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="#1A5276" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg leading-tight text-white">Land Governance Platform</p>
              <p className="text-amber-300 text-xs font-semibold tracking-wider uppercase">Ministry of Rural Development · GoI</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="tricolor-bar rounded-full mb-5 w-24 h-1.5" />
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-3">
              Evidence-Based<br />Land Governance<br />for a Resilient India
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed max-w-md">
              A national knowledge ecosystem integrating 6.08 lakh village cadastral surveys, ISRO satellite remote sensing, econometric policy simulations, and multi-institutional academic collaboration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { val: '6,08,452', label: 'Villages Digitized' },
              { val: '93.2%', label: 'National RoR Coverage' },
              { val: '12,847', label: 'Research Publications' },
              { val: '127', label: 'Partner Institutions' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3.5">
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-blue-200 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bhoomi Digital RoR Card Visual Thumbnail */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-4 max-w-md">
            <img 
              src={getAssetUrl('assets/images/secure_bhoomi_card.svg')} 
              alt="SVAMITVA Property Card" 
              className="w-16 h-20 object-contain bg-white rounded-lg shadow-sm p-1"
            />
            <div>
              <span className="bg-[#1E8449] text-white text-xs font-bold px-2.5 py-0.5 rounded">
                DigiLocker Certified
              </span>
              <p className="font-bold text-white text-sm mt-1">SVAMITVA Cryptographic Title Deed</p>
              <p className="text-blue-100 text-xs mt-0.5 leading-snug">Instant Single-Sign-On (SSO) for Revenue Officers &amp; Researchers</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-primary-300 text-xs">
            🇮🇳 Government of India · Ministry of Rural Development · SIH2024 – Problem ID: SIH26019
          </p>
          <p className="text-primary-400 text-xs mt-1">
            Developed under the Smart India Hackathon Initiative · Powered by Sarim Moin, MIC
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Map size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-primary-700 text-sm">Land Governance Platform</p>
              <p className="text-xs text-gov-muted">Ministry of Rural Development</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gov-text">Welcome back</h2>
            <p className="text-gov-muted text-sm mt-1">Sign in to access the platform</p>
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-gov-text mb-2 block">Access Role</label>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map((r) => (
                <div
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${role === r.value ? 'border-primary-400 bg-primary-50' : 'border-gov-border hover:border-primary-300 hover:bg-gray-50'}`}
                >
                  <p className="text-xs font-semibold text-gov-text">{r.label}</p>
                  <p className="text-xs text-gov-muted mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gov-text mb-1.5 block">
                Email / Government ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.gov.in"
                className="input"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold text-gov-text">Password</label>
                <button type="button" className="text-xs text-primary-600 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gov-muted hover:text-gov-text"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-gov-border accent-primary-600" />
              <label htmlFor="remember" className="text-xs text-gov-muted">Keep me signed in for 30 days</label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gov-border">
            <p className="text-xs text-center text-gov-muted mb-3">Or sign in with</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => toast('DigiLocker integration coming soon')} className="btn-secondary text-xs py-2.5 justify-center">
                🔐 DigiLocker
              </button>
              <button onClick={() => toast('NIC SSO integration coming soon')} className="btn-secondary text-xs py-2.5 justify-center">
                🏛️ NIC SSO
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gov-muted mt-5">
            New to the platform?{' '}
            <Link to="/" className="text-primary-600 font-medium hover:underline">Request Access</Link>
          </p>

          <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gov-border flex gap-2">
            <Shield size={14} className="text-primary-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gov-muted leading-relaxed">
              Your data is protected under the Information Technology Act 2000 and DPDP Act 2023.
              This platform uses MeitY-approved security protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
