
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bedankt voor uw aanmelding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            De IQ Bot bekijkt uw aanvraag.
            U ontvangt binnen 48 uur bericht via e-mail.
            Wij nemen zo spoedig mogelijk contact met u op.
          </p>
          <Button asChild className="w-full">
            <Link to="/">Terug naar home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
