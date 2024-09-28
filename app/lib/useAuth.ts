import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [loginUserEmail, setLoginUserEmail] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token: string | null = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        router.push("/user/login");
      }

      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt: { payload: { email: string } } = await jwtVerify(
          token ?? "",
          secretKey
        );
        setLoginUserEmail(decodedJwt.payload.email);
      } catch {
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);

  return loginUserEmail;
};

export default useAuth;
