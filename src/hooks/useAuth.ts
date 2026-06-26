import { useCallback } from "react";
import { trpc } from "@/providers/trpc";

export function useAuth() {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    window.location.reload();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    utils.invalidate();
    window.location.href = "/";
  }, []);

  const isAdmin = user?.role === "admin" || user?.role === "authority";

  return { user, isLoading, isLoggedIn: !!user, isAdmin, login, logout };
}
