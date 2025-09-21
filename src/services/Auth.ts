import { apiRequest } from "@/utils/api";
import { setCookie, destroyCookie } from "nookies";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface LoginData {
  email: string;
  password: string;
}

export async function LoginAdminService({ email, password }: LoginData) {
  try {
    const { access_token } = await apiRequest("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setCookie(undefined, "nextauth.token", access_token, {
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    });

    return access_token;
  } catch (error: any) {
    throw error;
  }
}

export async function AuthMe() {
  const token = Cookies.get("nextauth.token");
  try {
    const res = await apiRequest(`/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    toast.error(`Erro ao buscar os dados do usuário.`);
  }
}

export async function LogoutAdminService() {
  destroyCookie(null, "nextauth.token", {
    path: "/",
  });

  window.location.href = "/login";
}
