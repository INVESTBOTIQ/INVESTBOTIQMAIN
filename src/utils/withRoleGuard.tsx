
import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

/**
 * HOC to restrict route access based on userRole.
 * @param WrappedComponent The component to render when allowed
 * @param allowedRoles Array of roles that can access this component
 */
export function withRoleGuard<P>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function GuardedComponent(props: P) {
    const { user, userRole, loading } = useAuth();

    console.log("withRoleGuard - User:", user?.email, "Role:", userRole, "Loading:", loading, "Allowed Roles:", allowedRoles);

    // Show loading state while checking auth
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    // If no user, redirect to auth
    if (!user) {
      console.log("No user, redirecting to auth");
      return <Navigate to="/auth" replace />;
    }

    // Check if the user's role is allowed for this component
    if (!userRole || !allowedRoles.includes(userRole)) {
      console.log("User role not allowed, redirecting based on role", userRole);
      
      // For unauthorized access, redirect based on user's role
      if (userRole === "admin") {
        return <Navigate to="/admin" replace />;
      }
      
      if (userRole === "member") {
        return <Navigate to="/member/dashboard" replace />;
      }
      
      // For guests or unknown roles, redirect to home
      return <Navigate to="/" replace />;
    }

    console.log("Access granted to component for role:", userRole);
    // If the user's role is allowed, render the component
    return <WrappedComponent {...props} />;
  };
}
