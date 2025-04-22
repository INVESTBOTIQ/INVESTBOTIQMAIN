
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

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
  const homePath = userRole === "admin" ? "/admin" : "/member";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! De pagina die je zoekt bestaat niet.
        </p>
        <Button asChild className="w-full">
          <Link to={homePath}>Terug naar Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
