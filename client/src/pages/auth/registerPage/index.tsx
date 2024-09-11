import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { RegisterInputState, registerSchema } from "@/validations/authSchema";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [errors, setErrors] = useState<Partial<RegisterInputState>>({});
  const [input, setInput] = useState<RegisterInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const { register, loading } = useUserStore();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const registerSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RegisterInputState>);
      return;
    }

    setErrors({});
    await register(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={registerSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 dark:border-gray-900 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-semibold text-xl 2xl:text-2xl">
            Create an account
          </h1>
          <p className="text-sm 2xl:text-base text-gray-500">
            Register to create an account
          </p>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-3.5 size-5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.fullname}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-3.5 size-5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-3.5 size-5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-3.5 size-5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>

        <div className="mb-5">
          {loading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Register
            </Button>
          )}
        </div>

        <Separator />

        <p className="mt-5">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
