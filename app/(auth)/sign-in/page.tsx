"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormDataI>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: SignInFormDataI) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign in fail", {
        description:
          error instanceof Error ? error.message : "Failed to Sign in",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Inputs */}

        <InputField
          name="email"
          label="Email"
          placeholder="john-doe@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            message: "Invalid Email",
            required: "Email is required",
            minLength: {
              value: 6,
              message: "Email must be at least 6 characters",
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email format",
            },
          }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign In"}
        </Button>
        <FooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignInPage;
