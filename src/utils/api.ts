import { message } from "antd";

/**
 * Function to handle API errors
 * @param error - The error object
 */
export const handleApiError = (error: unknown) => {
  // check if error is an object
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    message.error(error.message);
  } else if (error !== null && typeof error === "object" && "data" in error) {
    handleApiError(error.data);
  } else {
  
    console.log(error);
  }
};
