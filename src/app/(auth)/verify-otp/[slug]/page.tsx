"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Card from "~/app/_components/card";
import { api } from "~/trpc/react";

const Page = ({params:{slug}}:{params:{slug:string}}) => {

  const router = useRouter()

  const [otp, setOtp] = React.useState<string[]>(['', '', '', '', '', '', '', '']);

  const verifyOtp = api.auth.verifyOtp.useMutation({
    onSuccess: (user) => {
      toast.success("OTP verified successfully, sign in to continue")
      router.replace('/sign-in')
      console.log(user);
    },
    onError: (err) => {
      toast.error('Invalid OTP, please check and try again')
    }
  });



  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    verifyOtp.mutate({ token: slug, otp: otp.join('') });
    return;
  };

  const onOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.trim();
    setOtp(newOtp);
  }

  const {isPending: isVerifyingOtp} = verifyOtp

  console.log('slug', slug)

  return (
    <main className="flex h-[calc(100vh-146px)] items-center justify-center">
      <Card>
        <div>
          <h1 className="mb-6 text-center text-3xl font-semibold">
            Verify your email
          </h1>
          <p className="font-light text-center">Enter the 8 digit code you have received on your email</p> 
          <form onSubmit={onSubmit}>
            <p className="font-light mt-10">Code</p>
            <div className="flex flex-row gap-3">
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[0]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 0)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[1]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 1)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 2)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[3]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 3)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[4]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 4)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[5]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 5)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[6]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 6)} disabled={isVerifyingOtp}/>
              <input className="border-slate-250 w-12 rounded-md border px-4 py-2 text-black" value={otp[7]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOtpChange(e, 7)} disabled={isVerifyingOtp}/>
            </div>
            <button
              type={"submit"}
              className="mb-6 mt-8 w-full rounded-md bg-black py-3 font-semibold text-white"
            >
              {isVerifyingOtp ? "VERIFYING..." : "VERIFY"}
            </button>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default Page;
