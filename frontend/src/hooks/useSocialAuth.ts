import { signInWithPopup } from "firebase/auth";
import { socialLogin } from "../lib/api";
import { auth, googleProvider, facebookProvider } from "../lib/firebase";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useSocialAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("google result:", result); // ← debug
      const firebaseToken = await result.user.getIdToken();
      console.log("token:", firebaseToken); // ← debug
      const data = await socialLogin(firebaseToken);
      queryClient.setQueryData(["auth"], data.user);
      navigate("/home", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Google login failed");
      } else {
        toast.error("Google login failed");
      }
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const firebaseToken = await result.user.getIdToken();
      const data = await socialLogin(firebaseToken);
      queryClient.setQueryData(["auth"], data.user);
      navigate("/home", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Facebook login failed");
      } else {
        toast.error("Facebook login failed");
      }
    }
  };

  return { loginWithGoogle, loginWithFacebook };
};
