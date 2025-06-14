import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-5xl mx-auto">
        <GlassCard className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* SIGNUP FORM - LEFT SIDE */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              {/* LOGO */}
              <div className="mb-8 flex items-center gap-3">
                <ShipWheelIcon className="w-10 h-10 text-primary-500" />
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Streamify
                </span>
              </div>

              {/* ERROR MESSAGE IF ANY */}
              {error && (
                <GlassCard className="p-4 mb-6 bg-red-500/10 border-red-500/20">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error.response?.data?.message || "An error occurred"}
                  </p>
                </GlassCard>
              )}

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Create an Account
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />

                  <Input
                    type="email"
                    label="Email"
                    placeholder="john@gmail.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />

                  <div className="space-y-1">
                    <Input
                      type="password"
                      label="Password"
                      placeholder="********"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" 
                      required 
                    />
                    <span className="text-xs text-neutral-600 dark:text-neutral-300 leading-tight">
                      I agree to the{" "}
                      <span className="text-primary-500 hover:text-primary-600 cursor-pointer">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary-500 hover:text-primary-600 cursor-pointer">
                        privacy policy
                      </span>
                    </span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    loading={isPending}
                    disabled={isPending}
                  >
                    Create Account
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Already have an account?{" "}
                      <Link 
                        to="/login" 
                        className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* IMAGE SECTION - RIGHT SIDE */}
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

export default SignUpPage;