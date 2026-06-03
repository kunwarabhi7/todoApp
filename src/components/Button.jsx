import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const UserLogin = () => {
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={googleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Login with Google
    </button>
  );
};

export default UserLogin;