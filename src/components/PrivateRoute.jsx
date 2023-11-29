import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./Loader";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (!user) {
    return loading ? <Loader /> : null;
  }

  return loading ? <Loader /> : children;
};

export default PrivateRoute;
