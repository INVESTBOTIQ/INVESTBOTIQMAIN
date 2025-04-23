
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

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/auth" />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      // For admins, redirect to /admin. For members, to /member/dashboard.
      if (userRole === "admin") return <Navigate to="/admin" />;
      if (userRole === "member") return <Navigate to="/member/dashboard" />;
      return <Navigate to="/auth" />;
    }

    return <WrappedComponent {...props} />;
  };
}
