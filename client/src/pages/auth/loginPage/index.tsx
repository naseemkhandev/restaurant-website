import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const loading = false;
  const errors = {
    email: "",
    password: "",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-4">
          <h1 className="font-semibold text-xl 2xl:text-2xl">Welcome back!</h1>
          <p className="text-sm 2xl:text-base text-gray-500">
            Login to your account
          </p>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute size-5 inset-y-3.5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors?.email}</span>
            )}
          </div>
        </div>

        <div className="mb-0">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute size-5 inset-y-3.5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors?.password}</span>
            )}
          </div>
        </div>

        <div className="mb-4 mt-2 w-fit ml-auto">
          <Link
            to="/auth/forgot-password"
            className="hover:text-blue-500 hover:underline"
          >
            Forgot Password
          </Link>
        </div>

        <div className="mb-5">
          {loading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}
        </div>

        <Separator />

        <p className="mt-5">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
