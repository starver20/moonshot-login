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
      <Card width={'600px'}>
        <div>
        <h1 className="text-3xl font-semibold text-center mb-6">Create Your Account</h1>
         <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
          <Input name={'name'} label={"Name"} placeholder={"Enter Name"}/>
          <Input name={'email'} label={"Email"} placeholder={"Enter Email"} type={"email"}/>
          <Input name={'password'} label={"Password"} placeholder={"Enter Password"} type={"password"}/>
          </div>
          <ButtonPrimary label={"CREATE ACCOUNT"} type={'submit'} onClick/>

          <div className="text-center">
            <p>Have an account?</p> 
            <Link href={'/sign-in'}>LOGIN</Link>
          </div>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default Page;
