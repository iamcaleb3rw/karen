import React from "react";
import Illustration from "@/public/complaint.svg";
import Image from "next/image";
import SignInForm from "@/components/signin-form";

const SignIn = () => {
  return (
    <div className="flex">
      <div className="bg-indigo-100 min-h-screen flex gap-4 flex-col px-8 justify-center">
        <div className="max-w-[400px]">
          <p className="text-xl font-semibold">
            It has never been easier to file a complaint
          </p>
          <p className="text-sm text-muted-foreground">
            Sign in or Create an account and complain about anythign with just a
            few clicks
          </p>
        </div>
        <Image src={Illustration} alt="Image" width={300} />
      </div>
      <div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
