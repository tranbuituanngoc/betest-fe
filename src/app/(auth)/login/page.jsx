import LoginForm from "@/components/forms/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative grid h-screen grid-cols-10">
      <div className="col-span-3 bg-white shadow-lg z-10">
        <div className="flex h-full flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>
            <LoginForm/>
          </div>
        </div>
      </div>

      <div className="col-span-7 bg-gradient-to-r from-[#03e8fd] to-[#7fd5cb] relative">
        <div className="flex h-full items-center justify-center">
          <Image
            src="/images/Login-side-image.png"
            alt="Login"
            width={500}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
