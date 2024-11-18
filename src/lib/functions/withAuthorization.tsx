import { useRouter } from "next/navigation";
import { useAuth, User } from "@/lib/state/context/auth.context";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const withAuthorization = (WrappedComponent: any, allowedRoles: string[]) => {
  return function AuthorizedPage(props: any) {
    const router = useRouter();
    const { user, loading } = useAuth();
    // useEffect(() => {
    //   setIsMounted(true);
    // }, []);
    useEffect(() => {
      // if (!isMounted || loading) return;
      if (!IsAuthorized(user, allowedRoles)) {
        router.replace("/"); // or redirect("/") to force navigation
      }
    }, [allowedRoles, router, loading, user]);
    if (loading) {
      return <Loader />;
    }

    if (!IsAuthorized(user, allowedRoles)) {
      // console.log("userIN auth", user, allowedRoles);
      // Redirect to the home page if unauthorized
      router.push("/");
      return null; // Render nothing during the redirect
    }

    // Render the wrapped component if authorized
    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;

export function IsAuthorized(
  user: User | null,
  allowedRoles: string[],
): boolean {
  console.log("Current User ====>>", user);

  if (user == null) return false;
  if (!allowedRoles) return true;
  if (user && allowedRoles.includes(user.role)) return true;
  return allowedRoles.length < 1;
}
