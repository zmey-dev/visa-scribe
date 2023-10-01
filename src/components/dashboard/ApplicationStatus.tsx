
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VisaApplication } from "@/types";

interface ApplicationStatusProps {
  visaApplications: VisaApplication[];
}

export const ApplicationStatus = ({ visaApplications }: ApplicationStatusProps) => {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="font-medium mb-2">Application Status</h2>
      {visaApplications.length > 0 ? (
        <>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-3xl font-bold capitalize">{visaApplications[0].status}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {visaApplications[0].status === 'draft' 
              ? "Your application is in progress. Complete all sections to submit."
              : visaApplications[0].status === 'submitted'
              ? "Your application has been submitted and is awaiting review."
              : visaApplications[0].status === 'review'
              ? "Your application is currently under review by our team."
              : visaApplications[0].status === 'approved'
              ? "Congratulations! Your visa application has been approved."
              : "Your application requires attention. Please check for details."}
          </p>
          <Button className="w-full" asChild>
            <Link to="/application">View Application</Link>
          </Button>
        </>
      ) : (
        <>
          <div className="text-muted-foreground mb-4">
            <p className="mb-2">You haven't started your visa application yet.</p>
            <p className="text-sm">
              Start your application to begin the Australian Student Visa process.
            </p>
          </div>
          <Button className="w-full bg-visa-primary hover:bg-visa-secondary" asChild>
            <Link to="/application">Start Application</Link>
          </Button>
        </>
      )}
    </div>
  );
};
