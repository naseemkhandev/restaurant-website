import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ForgotPasswordInputState,
  forgotPasswordSchema,
} from "@/validations/authSchema";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [error, setError] = useState<Partial<ForgotPasswordInputState>>({});
  const [email, setEmail] = useState<string>("");
  const loading = false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      const firstError = result.error.errors[0];
      setError((prev) => ({
        ...prev,
        [firstError?.path[0]]: firstError?.message,
      }));
    }

    console.log(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4 flex flex-col gap-4"
      >
        <div className="text-center">
          <h1 className="font-semibold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset your password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute inset-y-3.5 size-5 left-2 text-gray-500 pointer-events-none" />

          {error && <span className="text-xs text-red-500">{error.email}</span>}
        </div>

        {loading ? (
          <Button disabled className="">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="">
            Send Reset Link
          </Button>
        )}

        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
