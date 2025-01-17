"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { toast } from "sonner";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "CHECKBOX",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const AppointmentForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
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
  }: z.infer<typeof UserFormValidation>) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome to CarePulse</h1>
          <p className="text-dark-700">
            Please enter your username to continue.
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconsSrc="/assets/icons/user.svg"
          iconsAlt="user"
        />

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

        <SubmitButton isLoading={isLoading} className="w-full bg-green-500">
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
