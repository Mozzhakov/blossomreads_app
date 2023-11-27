import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./Loader";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // If the user is not authenticated, redirect to the login page
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, router, loading]);

  // If the user is not authenticated, don't render anything
  if (!user) {
    return loading ? <Loader /> : null;
  }

  // If the user is authenticated, render the children
  return loading ? <Loader /> : children;
};

export default PrivateRoute;
