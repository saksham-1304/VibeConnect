import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-5xl mx-auto">
        <GlassCard className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* LOGIN FORM SECTION */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              {/* LOGO */}
              <div className="mb-8 flex items-center gap-3">
                <ShipWheelIcon className="w-10 h-10 text-primary-500" />
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Streamify
                </span>
              </div>

              {/* ERROR MESSAGE DISPLAY */}
              {error && (
                <GlassCard className="p-4 mb-6 bg-red-500/10 border-red-500/20">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error.response?.data?.message || "An error occurred"}
                  </p>
                </GlassCard>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Welcome Back
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="hello@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />

                  <Input
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    loading={isPending}
                    disabled={isPending}
                  >
                    Sign In
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Don't have an account?{" "}
                      <Link 
                        to="/signup" 
                        className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* IMAGE SECTION */}
            <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 items-center justify-center p-12">
              <div className="max-w-md text-center">
                <div className="relative aspect-square max-w-sm mx-auto mb-8">
                  <img 
                    src="/i.png" 
                    alt="Language connection illustration" 
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Connect with language partners worldwide
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Practice conversations, make friends, and improve your language skills together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginPage;