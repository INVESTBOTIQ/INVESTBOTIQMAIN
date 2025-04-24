
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const BrandLogo = () => {
  const { userRole } = useAuth();
  const homePath = userRole === "admin" ? "/admin" : "/member/dashboard";

  return (
    <Link to={homePath} className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/d0eeddae-6648-46cf-b4a4-30ede87c6dc6.png" 
        alt="Investbotiq Icon" 
        className="h-10 w-auto"
      />
      <img 
        src="/lovable-uploads/5f5d8ba0-a589-457a-9989-8dc915655c00.png" 
        alt="Investbotiq Logo" 
        className="h-8 w-auto hidden md:block"
      />
    </Link>
  );
};

export default BrandLogo;
