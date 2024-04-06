"use client";
import React from "react";
import Card from "~/app/_components/card";

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
          <h1 className="mb-6 text-center text-3xl font-semibold">
            Verify your email
          </h1>
          <p className="font-light text-center">Enter the 8 digit code you have received on your email</p> 
          <form onSubmit={onSubmit}>
            <p className="mt-10">Code</p>
            <div className="flex flex-row gap-3">
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />{" "}
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />{" "}
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />{" "}
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />{" "}
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />{" "}
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />{" "}
              <input className="border-slate-250 w-10 rounded-md border px-4 py-2 text-black" />
            </div>
            <button
              type={"submit"}
              className="mb-6 mt-8 w-full rounded-md bg-black py-3 font-semibold text-white"
            >
              VERIFY
            </button>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default Page;
