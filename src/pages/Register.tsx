
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MultiStepForm } from "@/components/registration/MultiStepForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Aanmelden bij Investbotiq
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MultiStepForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
