import { useState } from "react";
import { login, signInWithGoogle } from "../services/auth"; // Added signInWithGoogle here
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Added navigation for Google login too
    } catch (err) {
      setError("Failed to sign in with Google.", err);
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-zinc-500 text-sm mt-2 font-medium">
            Log in to continue generating magic.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-red-400 text-xs font-medium">{error}</p>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full p-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-600 text-zinc-200"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-600 text-zinc-200"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          className="w-full mt-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2"
        >
          Sign In
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-zinc-800"></div>
          <span className="px-4 text-xs text-zinc-600 font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 border-t border-zinc-800"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-4 bg-zinc-800/50 border border-zinc-700 text-zinc-200 font-bold rounded-2xl hover:bg-zinc-800 hover:border-zinc-600 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-sm text-center text-zinc-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-white font-medium hover:text-indigo-400 underline underline-offset-4 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}