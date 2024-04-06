"use client";
import React from "react";
import Card from "~/app/_components/card";
import Input from "~/app/_components/Input";
import Link from "next/link";

const Page = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    return;
  };

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
                name={"email"}
                label={"Email"}
                placeholder={"Enter Email"}
                type={"email"}
              />
              <Input
                name={"password"}
                label={"Password"}
                placeholder={"Enter Password"}
                type={"password"}
              />
            </div>
            <button
              type={"submit"}
              className="mb-6 mt-8 w-full rounded-md bg-black py-3 font-semibold text-white"
            >
              LOGIN
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
