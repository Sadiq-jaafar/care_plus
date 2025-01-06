"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { toast } from "sonner";
import { FormFieldType } from "./patientForm";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof userFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      console.log("Creating user with data:", userData); // Debugging

      const user = await createUser(userData); // Call createUser
      console.log("User created in onSubmit:", user); // Debugging

      if (user && user.$id) {
        toast.success("User created successfully!"); // Notify the user
        router.push(`/patients/${user.$id}/register`);
      } else {
        console.error("User creation failed: No user ID returned");
        toast.error("User creation failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error); // Debugging

      if (error?.code === 409) {
        toast.error("User already exists. Please use a different email.");
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className=" space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about you.</p>
        </section>
        <section className=" space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Full Name"
          name="name"
          placeholder="John Doe"
          iconsSrc="/assets/icons/user.svg"
          iconsAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="elonAuwal@gmail.com"
            iconsSrc="/assets/icons/email.svg"
            iconsAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+234 123 456 7890"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+234 123 456 7890"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+234 123 456 7890"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6"></div>
        <div className="flex flex-col xl:flex-row gap-6"></div>
        <div className="flex flex-col xl:flex-row gap-6"></div>
        <div className="flex flex-col xl:flex-row gap-6"></div>

        <SubmitButton isLoading={isLoading} className="w-full bg-green-500">
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
