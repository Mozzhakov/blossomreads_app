import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./Loader";

const PublicRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, router, loading]);

  if (user) {
    return loading ? <Loader /> : null;
  }

  return loading ? <Loader /> : children;
};

export default PublicRoute;
