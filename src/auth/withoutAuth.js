"use client";
import { auth } from "@/firebase/Firebase";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const isLoggedIn = JSON.parse(
      localStorage.getItem("persist:isLoggedIn")
    ).isLoggedIn;
    useEffect(() => {
      if (isLoggedIn === "true") {
        return redirect("/");
      }
    }, []);

    if (isLoggedIn === "true") {
      return null;
    }

    return <Component {...props} />;
  };
}
