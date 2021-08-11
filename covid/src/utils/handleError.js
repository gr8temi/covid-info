import { toast } from "react-toastify";
import { retrieveMessage } from "./helpers";

//catch errors globally and toast them
const handleErrors = err => {
  toast.error(retrieveMessage(err));
};

export default handleErrors;
