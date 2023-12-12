import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../scss/notifications.scss";

export const useNotify = () => {
  const showFailure = (message) => {
    return toast.error(`${message}`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
    });
  };
  const showSuccess = (message) => {
    return toast.success(`${message}`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return { showFailure, showSuccess };
};
