"use client";
import React, { useState } from "react";
import Card from "~/app/_components/card";
import Input from "~/app/_components/Input";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {

  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };


// Used to seed the database
  const seedDb = api.products.seedDb.useMutation({
    onSuccess: async () => {
      router.refresh();
    },
  })

  const createUser = api.auth.signup.useMutation({
    onSuccess: async (user) => {
      console.log("success", user);
      router.push(`/verify-otp/${user.token}`,);
      clearForm();
      toast.success("User created successfully")
         await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ email:"amarnarute2002@gmail.com" }),
    });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong. Please try again later')
    }
  })

  const {isPending: isCreatingUser} = createUser

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // seedDb.mutate()
    createUser.mutate({name, email, password})
   
  }




  return (
    <main className="flex h-[calc(100vh-146px)] items-center justify-center">
      <Card>
        <div>
        <h1 className="text-3xl font-semibold text-center mb-6">Create Your Account</h1>
         <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
          <Input disabled={isCreatingUser} name={'name'} label={"Name"} placeholder={"Enter Name"} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
          <Input disabled={isCreatingUser} name={'email'} label={"Email"} placeholder={"Enter Email"} type={"email"} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
          <Input disabled={isCreatingUser} name={'password'} label={"Password"} placeholder={"Enter Password"} type={"password"} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
          </div>
          <button type={"submit"} className="w-full rounded-md bg-black py-3 mb-6 mt-8 font-semibold text-white" disabled={isCreatingUser} >
            {isCreatingUser ? "CREATING..." : "CREATE ACCOUNT"}
            </button>

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
