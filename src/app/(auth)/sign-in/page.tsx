"use client";
import React, { useState } from "react";
import Card from "~/app/_components/card";
import Input from "~/app/_components/Input";
import Link from "next/link";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const fetchUser = api.auth.signin.useMutation({
    onSuccess: (user) => {
      clearForm();
      toast.success("User logged in successfully")
      router.replace('/')
      console.log("success", user);
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong. Please try again later")
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUser.mutate({ email, password });
  };

  const {isPending: isLoggingIn} = fetchUser

  return (
    <main className="flex h-[calc(100vh-146px)] items-center justify-center">
      <Card>
        <div>
          <h1 className="mb-6 text-center text-3xl font-semibold">Login</h1>
          <h3 className="text-center text-xl">Welcome back to ECOMMERCE</h3>
          <p className="mb-6 text-center font-light">
            The next gen business marketplace!
          </p>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <Input
                disabled={isLoggingIn}
                name={"email"}
                label={"Email"}
                placeholder={"Enter Email"}
                type={"email"}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <Input
                disabled={isLoggingIn}
                name={"password"}
                label={"Password"}
                placeholder={"Enter Password"}
                type={"password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            <button
              type={"submit"}
              className="mb-6 mt-8 w-full rounded-md bg-black py-3 font-semibold text-white"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            <div className="flex flex-row items-center justify-center gap-2">
              <p className="font-light">Don&apos;t have an account?</p>
              <Link className="text-sm" href={"/sign-up"}>
                SIGN UP
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default Page;
