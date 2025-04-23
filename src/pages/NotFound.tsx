
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine the correct home path based on user role
  const homePath = userRole === "admin" ? "/admin" : "/member/dashboard";
  const buttonText = userRole === "admin" 
    ? "Terug naar Admin Console" 
    : userRole === "member" 
    ? "Terug naar je Dashboard"
    : "Terug naar Homepage";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Small version of the orb for visual consistency */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse opacity-40"></div>
            <div className="absolute w-4/5 h-4/5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-pulse opacity-30" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-2">
          Buiten bereik van de IQ Bot
        </p>
        <p className="text-gray-500 mb-6">
          Deze pagina bestaat niet of je hebt een onbekende route gevolgd.
        </p>
        <Button asChild className="w-full mb-4">
          <Link to={homePath}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {buttonText}
          </Link>
        </Button>
        <p className="text-sm text-gray-400 mt-4">
          Misschien wordt deze pagina binnenkort geactiveerd.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
