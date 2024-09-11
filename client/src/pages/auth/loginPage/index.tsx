import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, loginSchema } from "@/validations/authSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const loading = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(input);
    if (!result.success) {
      const formErrors = result.error.formErrors.fieldErrors;
      setErrors(formErrors as Partial<LoginInputState>);
      return;
    }

    console.log(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 dark:border-gray-900 mx-4"
      >
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
              value={input?.email}
              onChange={handleChange}
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
              value={input?.password}
              onChange={handleChange}
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
            className="hover:text-primary hover:underline"
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
          <Link to="/auth/register" className="text-primary underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
