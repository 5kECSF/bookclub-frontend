import { useRouter } from "next/navigation";
import { useAuth, User } from "@/lib/state/context/jotai-auth";
import { useEffect } from "react";

const withAuthorization = (WrappedComponent: any, allowedRoles: string[]) => {
  return function AuthorizedPage(props: any) {
    const router = useRouter();
    const { user, loading, loggedIn } = useAuth();

    useEffect(() => {
      if (loading === false && !IsAuthorized(user, allowedRoles)) {
        router.replace("/"); // or redirect("/") to force navigation
      }
    }, [loading, user]);

    // Ensure consistent output during SSR
    if (typeof window === "undefined" || loading === null) {
      return <div style={{ visibility: "hidden" }}></div>; // Prevent mismatch
    }
    if (loading || loggedIn === null) {
      return <div>Loading...</div>;
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
