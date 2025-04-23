
import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

/**
 * HOC to restrict route access based on userRole.
 * @param WrappedComponent The component to render when allowed
 * @param allowedRoles Array: e.g. ['admin'], ['member']
 */
export function withRoleGuard<P>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function GuardedComponent(props: P) {
    const { user, userRole, isLoading } = useAuth();

    // Show loading state while checking auth
    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    // If no user, redirect to auth
    if (!user) {
      console.log("No user found, redirecting to /auth");
      return <Navigate to="/auth" replace />;
    }

    console.log("withRoleGuard - Current user role:", userRole, "Allowed roles:", allowedRoles);
    console.log("withRoleGuard - Current user email:", user.email);

    // Check if the user's role is allowed for this component
    if (!userRole || !allowedRoles.includes(userRole)) {
      console.log("User role not allowed, redirecting based on role");
      
      // For admins, redirect to /admin. For members, to /member/dashboard.
      if (userRole === "admin") {
        console.log("Redirecting admin to admin dashboard");
        return <Navigate to="/admin" replace />;
      }
      
      if (userRole === "member") {
        console.log("Redirecting member to member dashboard");
        return <Navigate to="/member/dashboard" replace />;
      }
      
      // If role is neither admin nor member, redirect to auth
      return <Navigate to="/auth" replace />;
    }

    // If the user's role is allowed, render the component
    console.log("Role allowed, rendering component");
    return <WrappedComponent {...props} />;
  };
}
