import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../../main";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${authServices}/api/auth/login`, {
        code: authResult.code,
      });

      localStorage.setItem("token", result.data.token);

      toast.success(result.data.message);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Probelm while login");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <section className="flex min-h-screen justify-center items-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-3xl font-bold text-[#E23774]">
          Mealix
        </h1>
        <p className="text-center text-sm text-gray-500">Login / Sign up</p>

        <button
          onClick={googleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-800 cursor-pointer px-4 py-3"
        >
          <FcGoogle size={20} />{" "}
          {loading ? "LOADING..." : "Continue With Google"}
        </button>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree with our{" "}
          <span className="text-[#E23774]">Terms of Service</span> &{" "}
          <span className="text-[#E23774]">Privacy Policy</span>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
