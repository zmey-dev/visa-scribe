
import { DocumentStatus } from "./DocumentStatus";
import { ApplicationStatus } from "./ApplicationStatus";
import { HelpResources } from "./HelpResources";
import { DocumentType, UploadedDocument, VisaApplication } from "@/types";

interface DashboardOverviewProps {
  uploadedDocuments: UploadedDocument[];
  documentTypes: DocumentType[];
  visaApplications: VisaApplication[];
}

export const DashboardOverview = ({ 
  uploadedDocuments, 
  documentTypes, 
  visaApplications 
}: DashboardOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DocumentStatus 
        uploadedDocuments={uploadedDocuments} 
        documentTypes={documentTypes} 
      />
      <ApplicationStatus visaApplications={visaApplications} />
      <HelpResources />
    </div>
  );
};
