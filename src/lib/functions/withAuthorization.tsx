import { useAuth } from "@/lib/state/context/jotai-auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuthorization = (WrappedComponent: any, allowedRoles: string[]) => {
  return function AuthorizedPage(props: any) {
    const router = useRouter();
    const { user, loading, loggedIn } = useAuth();

    useEffect(() => {
      if (loggedIn === false) {
        console.log("logged in ===false");
        router.replace("/");
        return;
      }
      if (loading === false && !IsAuthorized(user, allowedRoles)) {
        console.log("not authorized", user);
        router.replace("/"); // or redirect("/") to force navigation
      }
    }, [loading, user, router, loggedIn]);

    // Ensure consistent output during SSR
    if (typeof window === "undefined" || loading === null) {
      return <div style={{ visibility: "hidden" }}></div>; // Prevent mismatch
    }
    if (loading || loggedIn === null) {
      return <div>Loading...</div>;
    }

    if (!IsAuthorized(user, allowedRoles)) {
      return <div>You are not authorized to view this page.</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;

export function IsAuthorized(
  user: IUser | null,
  allowedRoles: string[],
): boolean {


  if (user == null) return false;
  if (!allowedRoles) return true;
  if (user && allowedRoles.includes(user.role)) return true;
  return allowedRoles.length < 1;
}
