import { useRouter } from "next/navigation";
import { useAuth, User } from "@/lib/state/context/jotai-auth";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const withAuthorization = (WrappedComponent: any, allowedRoles: string[]) => {
  return function AuthorizedPage(props: any) {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (loading == null) return;
      if (!IsAuthorized(user, allowedRoles)) {
        router.replace("/"); // or redirect("/") to force navigation
      }
    }, [router, loading, user]);

    if (typeof window === "undefined") {
      return null;
    }
    if (loading || loading === null) {
      return <Loader />;
    }

    if (!IsAuthorized(user, allowedRoles)) {
      router.push("/");
      return null; // Render nothing during the redirect
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;

export function IsAuthorized(
  user: User | null,
  allowedRoles: string[],
): boolean {
  // console.log("Current User ====>>", user);

  if (user == null) return false;
  if (!allowedRoles) return true;
  if (user && allowedRoles.includes(user.role)) return true;
  return allowedRoles.length < 1;
}
