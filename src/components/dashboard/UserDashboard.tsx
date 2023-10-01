
import { User, DocumentType, UploadedDocument, VisaApplication } from "@/types";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardOverview } from "./DashboardOverview";
import { RecentDocuments } from "./RecentDocuments";
import { ApplicationSummary } from "@/components/visa/ApplicationSummary";

interface UserDashboardProps {
  currentUser: User;
  documentTypes: DocumentType[];
  uploadedDocuments: UploadedDocument[];
  visaApplications: VisaApplication[];
}

export const UserDashboard = ({ 
  currentUser, 
  documentTypes, 
  uploadedDocuments, 
  visaApplications 
}: UserDashboardProps) => {
  return (
    <div>
      <DashboardHeader currentUser={currentUser} visaApplications={visaApplications} />
      
      <DashboardOverview
        uploadedDocuments={uploadedDocuments}
        documentTypes={documentTypes}
        visaApplications={visaApplications}
      />
      
      {/* Application Preview */}
      {visaApplications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Application</h2>
          <ApplicationSummary application={visaApplications[0]} />
        </div>
      )}
      
      <RecentDocuments 
        uploadedDocuments={uploadedDocuments} 
        documentTypes={documentTypes} 
      />
    </div>
  );
};
