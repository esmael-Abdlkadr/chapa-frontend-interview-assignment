import toast from "react-hot-toast";

export const toastService = {

  success: (message: string) => {
    return toast.success(message);
  },
  error: (message: string) => {
    return toast.error(message);
  },
  info: (message: string) => {
    return toast(message);
  },

  loading: (message: string) => {
    return toast.loading(message);
  },


  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },
  dismissAll: () => {
    toast.dismiss();
  },

 
  custom: (message: string, options?: any) => {
    return toast(message, options);
  },
};
