"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import ProfileForm from "../components/ProfileForm";

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <>
          <p>
            Welcome, {user.displayName} - you are logged in to the profile page -
            a protected route.
          </p>
          <ProfileForm />  {/* Render ProfileForm only when user is logged in */}
        </>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </div>
  );
};



export default page;
