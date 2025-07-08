import toast from "react-hot-toast";

export const toastService = {
  /**
   * Show a success toast notification
   * @param message Message to display
   */
  success: (message: string) => {
    return toast.success(message);
  },

  /**
   * Show an error toast notification
   * @param message Message to display
   */
  error: (message: string) => {
    return toast.error(message);
  },

  /**
   * Show an informational toast notification
   * @param message Message to display
   */
  info: (message: string) => {
    return toast(message);
  },

  /**
   * Show a loading toast notification
   * @param message Message to display
   */
  loading: (message: string) => {
    return toast.loading(message);
  },

  /**
   * Dismiss a specific toast by ID
   * @param toastId ID of the toast to dismiss
   */
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Show a custom toast notification
   * @param message Message to display
   * @param options Custom toast options
   */
  custom: (message: string, options?: any) => {
    return toast(message, options);
  },
};
