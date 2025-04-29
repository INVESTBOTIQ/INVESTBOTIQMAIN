
import { ReactNode } from "react";

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="font-medium">{title}</h3>}
      {children}
    </div>
  );
};
