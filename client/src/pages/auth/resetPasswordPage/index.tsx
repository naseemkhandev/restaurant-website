import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResetPasswordInputState,
  resetPasswordSchema,
} from "@/validations/authSchema";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [error, setError] = useState<Partial<ResetPasswordInputState>>({});
  const [newPassword, setNewPassword] = useState<string>("");
  const loading = false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse({ newPassword });
    if (!result.success) {
      const firstError = result.error.errors[0];
      setError((prev) => ({
        ...prev,
        [firstError?.path[0]]: firstError?.message,
      }));
    }

    console.log(newPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4 flex flex-col gap-4"
      >
        <div className="text-center">
          <h1 className="font-semibold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Enter your new password to reset your password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
          />
          <LockKeyholeIcon className="absolute inset-y-3.5 size-5 left-2 text-gray-500 pointer-events-none" />

          {error && (
            <span className="text-xs text-red-500">{error.newPassword}</span>
          )}
        </div>

        {loading ? (
          <Button disabled className="">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="">
            Reset
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

export default ResetPasswordPage;
