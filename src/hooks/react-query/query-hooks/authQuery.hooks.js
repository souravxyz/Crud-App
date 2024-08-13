import { useMutation } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { userSignIn, userSignUp } from "../../../Api/ApiHandler";
import { USERS } from "../query-keys/authQuery.keys";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* Signup Mutations */
export const useUserSignInMutation = () => {
  
  const { queryClient, navigate } = useGlobalHooks();
  return useMutation({
    mutationFn: userSignIn,
    onSuccess: (response) => {
      const {
        token,
        status,
        message,
        data: { first_name, profile_pic },
      } = response || {};
      if (status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", first_name);
        localStorage.setItem("proimg", profile_pic);
        navigate("/createProduct");
        toast(message,"success");
        //   navigateWithToast("/createProduct", message, "success");
      } else {
         navigate("/signin");
         toast(message,"error");
      }
      queryClient.invalidateQueries({ queryKey: [USERS] });
    },
  });
};

/* Signin Mutations */

export const useUserSignUpMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: userSignUp,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (!!status && status === 200) {
         navigate("/signin");
        toast(message,"success");
        queryClient.invalidateQueries({ queryKey: [USERS] });
      } else {
         navigate("/signup");
         toast(message,"success");
      }
    },
  });
};
