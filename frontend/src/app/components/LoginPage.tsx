import { useState } from 'react';
import { Code2, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate('/dashboard');
  };

  const handleOAuth = (provider: string) => {
    // Mock OAuth - navigate to dashboard
    console.log(`OAuth with ${provider}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D0D0D] relative overflow-hidden items-center justify-center p-8">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FF88] rounded-full blur-[150px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-12">
          <Code2 className="w-20 h-20 text-[#00FF88] mx-auto mb-6" />
          <h1 className="text-5xl mb-4 text-[#E0E0E0]">
            WebBuilder <span className="text-gradient">AI</span>
          </h1>
          <p className="text-xl text-[#A0A0A0] mb-8">
            Build production-ready websites with the power of AI
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-lg bg-[#121212] border border-[#00FF88]/30">
              <div className="text-3xl mb-1 text-[#00FF88]">10K+</div>
              <div className="text-sm text-[#A0A0A0]">Websites Built</div>
            </div>
            <div className="p-4 rounded-lg bg-[#121212] border border-[#00FF88]/30">
              <div className="text-3xl mb-1 text-[#00FF88]">5K+</div>
              <div className="text-sm text-[#A0A0A0]">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-[#121212] flex items-center justify-center px-6 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Code2 className="w-8 h-8 text-[#00FF88]" />
            <span className="text-xl text-[#E0E0E0]">WebBuilder AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl mb-2 text-[#E0E0E0]">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm sm:text-base text-[#A0A0A0]">
              {isLogin ? 'Sign in to continue building' : 'Sign up to start building with AI'}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full py-3 px-4 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] hover:border-[#00FF88]/50 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuth('github')}
              className="w-full py-3 px-4 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] hover:border-[#00FF88]/50 transition-all flex items-center justify-center gap-3"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1a1a1a]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#121212] text-[#A0A0A0]">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm mb-2 text-[#E0E0E0]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#00FF88] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#E0E0E0]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#00FF88] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#A0A0A0]">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#1a1a1a] bg-[#0D0D0D]" />
                  Remember me
                </label>
                <a href="#" className="text-[#00FF88] hover:text-[#00cc66]">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-all glow-green-hover flex items-center justify-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#A0A0A0]">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#00FF88] hover:text-[#00cc66]"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
            <p className="text-xs text-center text-[#A0A0A0]">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}