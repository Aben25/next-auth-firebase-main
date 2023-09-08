"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserAuth } from "../context/AuthContext";


const formSchema = z.object({
    fullName: z.string().nonempty({ message: "Full name is required" }),
    occupation: z.string().nonempty({ message: "Occupation is required" }),
    bio: z.string().optional(),
  });
const ProfileForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { profile, saveProfileData } = UserAuth(); // Destructure saveProfileData and profile from the AuthContext
  const [loading, setLoading] = useState(false); // Add this line for loading state

// 1. Define your form.
const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues : {
        fullName: profile?.fullName,
        occupation: profile?.occupation,
        bio: profile?.bio,
    },
    mode: "onBlur",
    });


  useEffect(() => {
    if (profile) {
      setValue("fullName", profile.fullName);
      setValue("occupation", profile.occupation);
      setValue("bio", profile.bio);
    }
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when save starts
    try {
      await saveProfileData(data);
      console.log("Profile saved successfully.");
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false); // Set loading to false when save ends
    }
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  );
};

export default ProfileForm;