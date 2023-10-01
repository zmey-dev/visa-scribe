
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DocumentType, UploadedDocument } from "@/types";

interface DocumentStatusProps {
  uploadedDocuments: UploadedDocument[];
  documentTypes: DocumentType[];
}

export const DocumentStatus = ({ uploadedDocuments, documentTypes }: DocumentStatusProps) => {
  // Calculate document completion status
  const requiredDocumentTypes = documentTypes.filter(dt => dt.required).length;
  const uploadedRequiredDocuments = uploadedDocuments.filter(
    doc => {
      const docType = documentTypes.find(dt => dt.id === doc.documentTypeId);
      return docType?.required && doc.status === 'completed';
    }
  ).length;
  
  const documentCompletionPercentage = 
    requiredDocumentTypes > 0
      ? Math.round((uploadedRequiredDocuments / requiredDocumentTypes) * 100)
      : 0;

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="font-medium mb-2">Document Status</h2>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl font-bold">{uploadedRequiredDocuments}/{requiredDocumentTypes}</span>
        <span className="text-sm text-muted-foreground mb-1">required documents uploaded</span>
      </div>
      <div className="relative">
        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-muted">
          <div 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-visa-primary"
            style={{ width: `${documentCompletionPercentage}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          {documentCompletionPercentage}% complete
        </div>
      </div>
      <Button className="w-full mt-4" variant="outline" asChild>
        <Link to="/documents">Manage Documents</Link>
      </Button>
    </div>
  );
};
