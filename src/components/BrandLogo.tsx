
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const BrandLogo = () => {
  const { userRole } = useAuth();
  const homePath = userRole === "admin" ? "/admin" : "/member/dashboard";

  return (
    <Link to={homePath} className="flex items-center gap-2">
      <div className="font-bold text-primary text-lg md:text-xl">Investbotiq</div>
    </Link>
  );
};

export default BrandLogo;
