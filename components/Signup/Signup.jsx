"use client";
import React, { useState } from "react";
import Image from "next/image";
import signupImage from "../../public/images/signup.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileUpload } from "../index.js";
import { upload } from "@imagekit/next";



function Signup() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const router = useRouter()

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Confirm password does not match password field");
      return;
    }

    setIsSubmitting(true);

    try {
      let avatarFilePath = "";
      let avatarFileId = "";

      if (selectedFile) {
        const authRes = await fetch("/api/imagekit-auth");
        if (!authRes.ok) throw new Error("Failed to get auth params");
        const auth = await authRes.json();

        const uploadRes = await upload({
          file: selectedFile,
          fileName: selectedFile.name,
          token: auth.token,
          signature: auth.signature,
          expire: auth.expire,
          publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
          endpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
          folder: "/next-todo-profile-image",
        });

        avatarFilePath = uploadRes.filePath;
        avatarFileId = uploadRes.fileId;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          email,
          password,
          fileURL: avatarFilePath,
          fileId: avatarFileId,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to register user");
      }

      router.push("/login")
    } catch (error) {
      console.error("Registration Error: ", error);
    } finally {
      setIsSubmitting(false);
    }

    
  };

 

  return (
    <>
      <div className="w-screen h-screen bg-[#4F46E5] py-15 px-30">
        <div className="w-full h-full bg-white rounded-lg">
          <div className="flex justify-center gap-20 items-center">
            <div className="left-side">
              <Image src={signupImage} alt="Signup-Image" />
            </div>
            <div className="right-side">
              <div className="h-full">
                <h1 className="text-black font-bold text-2xl mb-5">Sign Up</h1>
                <form className="flex flex-col gap-3 focus-within:outline-[#4F46E5]" onSubmit={handleSignup}>
                  <FileUpload onFileSelect={(file) => setSelectedFile(file)} />
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e)=> setFullName(e.target.value)}
                    placeholder="Enter FullName..."
                  />
                  <input
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={(e)=> setUserName(e.target.value)}
                    placeholder="Enter Username..."
                  />
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Enter Email..."
                  />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder="Enter Password..."
                  />
                  <input
                    type="password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password..."
                  />
                  <button disabled={isSubmitting} className="w-fit bg-[#4F46E5] hover:bg-[#4338CA] font-light text-sm text-white rounded-sm px-4 py-2 disabled:opacity-50">
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                  <p className="text-black text-sm font-light">
                    Already have an account?{" "}
                    <span className="text-blue-500">
                      <Link href="/login">Sign In</Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;