
// This file is now a redirect helper as Home is now the landing page.
import { Navigate } from "react-router-dom";
export default function IndexPage() {
  return <Navigate to="/" replace />;
}
