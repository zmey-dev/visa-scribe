
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, VisaApplication } from "@/types";

interface DashboardHeaderProps {
  currentUser: User;
  visaApplications: VisaApplication[];
}

export const DashboardHeader = ({ currentUser, visaApplications }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {currentUser.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Manage your Australian Student Visa application process
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link to="/documents">Manage Documents</Link>
        </Button>
        <Button className="bg-visa-primary hover:bg-visa-secondary" asChild>
          <Link to="/application">
            {visaApplications.length > 0 ? "View Application" : "Start Application"}
          </Link>
        </Button>
      </div>
    </div>
  );
};
