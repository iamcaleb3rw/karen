import React from "react";
import Illustration from "@/public/complaint.svg";
import Image from "next/image";
import SignInForm from "@/components/signin-form";
import { Component } from "@/components/etheral-shadow";

const SignIn = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <SignInForm />
      </div>
      <div className="md:flex hidden w-full h-screen justify-center items-center py-2 pr-2">
        <Component
          color="#6366f1"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default SignIn;
