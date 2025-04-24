
import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import ProfileLayout from "@/components/profile/ProfileLayout";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import SecurityCard from "@/components/profile/SecurityCard";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <ProfileLayout>
      <div className="space-y-6">
        <PersonalInfoCard user={user} />
        <SecurityCard />
      </div>
    </ProfileLayout>
  );
};

export default withRoleGuard(Profile, ["member"]);
