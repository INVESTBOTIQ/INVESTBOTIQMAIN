
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Mijn Profiel</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
