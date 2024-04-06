"use client";
import React from "react";
import Card from "~/app/_components/card";
import Input from "~/app/_components/Input";
import ButtonPrimary from "~/app/_components/button-primary";
import Link from "next/link";

const Page = () => {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e)
    e.preventDefault()
    return;
  }



  return (
    <main className="flex h-[calc(100vh-146px)] items-center justify-center">
      <Card>
        <div>
        <h1 className="text-3xl font-semibold text-center mb-6">Create Your Account</h1>
         <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
          <Input name={'name'} label={"Name"} placeholder={"Enter Name"}/>
          <Input name={'email'} label={"Email"} placeholder={"Enter Email"} type={"email"}/>
          <Input name={'password'} label={"Password"} placeholder={"Enter Password"} type={"password"}/>
          </div>
          <button type={"submit"} className="w-full rounded-md bg-black py-3 mb-6 mt-8 font-semibold text-white" >CREATE ACCOUNT</button>

          <div className="flex flex-row gap-2 justify-center items-center">
            <p className="font-light">Have an account?</p> 
            <Link className="text-sm" href={'/sign-in'}>LOGIN</Link>
          </div>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default Page;
