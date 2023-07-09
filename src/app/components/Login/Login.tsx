"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="bg-gptGreen h-screen flex flex-col items-center justify-center text-center">
      <Image src="/assets/GPTLogo.png" width={300} height={300} alt="ChatGPT" />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
