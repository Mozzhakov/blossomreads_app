import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useNotify = () => {
  const showFailure = (message) => {
    return toast.error(`${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return { showFailure };
};
