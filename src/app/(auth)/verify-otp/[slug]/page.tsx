"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Card from "~/app/_components/card";
import { api } from "~/trpc/react";
import OtpInput from "react-otp-input";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  const router = useRouter();
  const [otp, setOtp] = React.useState<string>("");

  const verifyOtp = api.auth.verifyOtp.useMutation({
    onSuccess: (user) => {
      toast.success("OTP verified successfully, sign in to continue");
      router.replace("/sign-in");
      console.log(user);
    },
    onError: (err) => {
      toast.error("Invalid OTP, please check and try again");
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    verifyOtp.mutate({ token: slug, otp });
    return;
  };

  const { isPending: isVerifyingOtp } = verifyOtp;

  console.log("slug", slug);

  return (
    <main className="flex h-[calc(100vh-146px)] items-center justify-center ">
      <Card>
        <div>
          <h1 className="mb-6 text-center text-3xl font-semibold">
            Verify your email
          </h1>
          <p className="text-center font-light">
            Enter the 8 digit code you have received on your email
          </p>
          <form onSubmit={onSubmit}>
            <p className="mt-10 font-light">Code</p>
            {/* <div className="flex flex-row gap-3"> */}
              <OtpInput
                value={otp}
                containerStyle={{ width: "100%", display: "flex", flexDirection: "row", justifyContent:'space-between' }}
                inputStyle={{ width:'50px', height:'50px'}}
                onChange={setOtp}
                numInputs={8}
                renderSeparator={() => <span> - </span>}
                renderInput={(props) => <input  {...props} className="border-slate-250 rounded-md border text-black"/>}
              />
            {/* </div> */}
            <button
              type={"submit"}
              className="mb-6 mt-8 w-full rounded-md bg-black py-3 font-semibold text-white"
            >
              {isVerifyingOtp ? "VERIFYING..." : "VERIFY"}
            </button>
            <div className="flex flex-row items-center justify-start gap-2">
              <InfoOutlinedIcon />
              <p className="font-light">
                If you did not get an email with OTP, use 00000000 as your OTP.
              </p>
            </div>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default Page;
