
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DocumentType, UploadedDocument } from "@/types";

interface RecentDocumentsProps {
  uploadedDocuments: UploadedDocument[];
  documentTypes: DocumentType[];
}

export const RecentDocuments = ({ uploadedDocuments, documentTypes }: RecentDocumentsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
      {uploadedDocuments.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Document Type</th>
                <th className="text-left p-4">File Name</th>
                <th className="text-left p-4">Upload Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4"></th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocuments.slice(0, 3).map((doc) => {
                const docType = documentTypes.find(dt => dt.id === doc.documentTypeId);
                return (
                  <tr key={doc.id} className="border-t">
                    <td className="p-4">{docType?.name || 'Unknown'}</td>
                    <td className="p-4">{doc.fileName}</td>
                    <td className="p-4">{new Date(doc.uploadDate).toLocaleDateString()}</td>
                    <td className="p-4 capitalize">{doc.status}</td>
                    <td className="p-4">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/documents">View</Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground mb-2">No documents uploaded yet</p>
          <Button asChild>
            <Link to="/documents">Upload Documents</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
