
import { Button } from "@/components/ui/button";

interface ConfirmationFooterProps {
  onBack: () => void;
  onSubmit: () => void;
  disabled: boolean;
  submitting: boolean;
}

export const ConfirmationFooter = ({ onBack, onSubmit, disabled, submitting }: ConfirmationFooterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
      <Button type="button" variant="outline" onClick={onBack} disabled={submitting} className="w-full sm:w-auto">
        Terug
      </Button>
      <Button onClick={onSubmit} disabled={disabled || submitting} className="w-full sm:w-auto shadow-md text-base py-6">
        {submitting ? "Aanmelden..." : "Aanmelden"}
      </Button>
    </div>
  );
};
