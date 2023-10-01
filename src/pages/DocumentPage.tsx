
import { Layout } from "@/components/layout/Layout";
import { FileUpload } from "@/components/documents/FileUpload";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DocumentPage = () => {
  const { uploadedDocuments, documentTypes } = useApp();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadComplete = () => {
    // Force a re-render by updating the key
    setRefreshKey(prev => prev + 1);
  };

  // Group documents by type
  const documentsByType = documentTypes.map(type => {
    const docs = uploadedDocuments.filter(doc => doc.documentTypeId === type.id);
    return {
      type,
      documents: docs
    };
  });

  // Calculate completion status
  const requiredDocumentTypes = documentTypes.filter(dt => dt.required);
  const completedRequiredTypes = requiredDocumentTypes.filter(type => 
    uploadedDocuments.some(doc => 
      doc.documentTypeId === type.id && doc.status === 'completed'
    )
  );
  
  const completionPercentage = Math.round(
    (completedRequiredTypes.length / requiredDocumentTypes.length) * 100
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-muted-foreground mt-1">
              Upload and manage your visa application documents
            </p>
          </div>
          
          {uploadedDocuments.length > 0 && completionPercentage === 100 && (
            <Button className="bg-visa-primary hover:bg-visa-secondary" asChild>
              <Link to="/application">Proceed to Application</Link>
            </Button>
          )}
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-8 bg-white p-6 border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Upload Progress</h2>
          
          <div className="relative">
            <div className="overflow-hidden h-4 mb-2 text-xs flex rounded bg-muted">
              <div 
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  completionPercentage === 100 ? 'bg-visa-success' : 'bg-visa-primary'
                }`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedRequiredTypes.length} of {requiredDocumentTypes.length} required documents uploaded</span>
              <span>{completionPercentage}% complete</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Required Documents:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {requiredDocumentTypes.map(type => {
                const isUploaded = uploadedDocuments.some(
                  doc => doc.documentTypeId === type.id && doc.status === 'completed'
                );
                
                return (
                  <li key={type.id} className={isUploaded ? 'text-visa-success' : ''}>
                    {type.name} {isUploaded && '✓'}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* File Upload Component */}
          <div className="md:col-span-1">
            <FileUpload key={refreshKey} onUploadComplete={handleUploadComplete} />
          </div>
          
          {/* Document Cards */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              {documentsByType.map(({ type, documents }) => (
                documents.length > 0 ? (
                  <div key={type.id}>
                    <h2 className="text-lg font-semibold mb-4">{type.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {documents.map(doc => (
                        <DocumentCard key={doc.id} document={doc} />
                      ))}
                    </div>
                  </div>
                ) : null
              ))}
              
              {uploadedDocuments.length === 0 && (
                <div className="text-center p-12 border rounded-lg bg-white">
                  <h2 className="text-lg font-semibold mb-2">No Documents Yet</h2>
                  <p className="text-muted-foreground mb-4">
                    Upload your documents to start the visa application process
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentPage;
