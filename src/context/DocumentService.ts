
import { DocumentType, UploadedDocument } from '@/types';
import { processDocumentWithOCR } from '@/services/ocrService';
import { useToast } from '@/hooks/use-toast';

export interface DocumentServiceProps {
  currentUserId: string | null;
  setUploadedDocuments: React.Dispatch<React.SetStateAction<UploadedDocument[]>>;
  uploadedDocuments: UploadedDocument[];
  documentTypes: DocumentType[];
}

export const useDocumentService = ({
  currentUserId,
  setUploadedDocuments,
  uploadedDocuments,
  documentTypes
}: DocumentServiceProps) => {
  const { toast } = useToast();

  const getDocumentById = (id: string) => {
    return uploadedDocuments.find(doc => doc.id === id);
  };

  const getDocumentTypeById = (id: string) => {
    return documentTypes.find(type => type.id === id);
  };

  const uploadDocument = async (file: File, documentTypeId: string): Promise<UploadedDocument | null> => {
    if (!currentUserId) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to upload documents."
      });
      return null;
    }

    // Create initial document with uploading status
    const newDocId = `doc${Date.now()}`;
    const newDocument: UploadedDocument = {
      id: newDocId,
      userId: currentUserId,
      documentTypeId,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file), // Create local URL for preview
      uploadDate: new Date().toISOString(),
      status: 'uploading',
      extractedText: null
    };

    // Add document to state
    setUploadedDocuments(prev => [...prev, newDocument]);

    try {
      // Update status to processing
      setUploadedDocuments(prev => 
        prev.map(doc => 
          doc.id === newDocId 
            ? { ...doc, status: 'processing' as const } 
            : doc
        )
      );

      // Process document with OCR (mock)
      const ocrResult = await processDocumentWithOCR(file, documentTypeId);

      // Update document with OCR results
      if (ocrResult.success) {
        const updatedDoc: UploadedDocument = {
          ...newDocument,
          status: 'completed',
          extractedText: ocrResult.text
        };
        
        setUploadedDocuments(prev => 
          prev.map(doc => 
            doc.id === newDocId ? updatedDoc : doc
          )
        );
        
        toast({
          title: "Document Processed",
          description: `Successfully extracted text from ${file.name}`
        });
        
        return updatedDoc;
      } else {
        // Handle error
        const errorDoc: UploadedDocument = {
          ...newDocument,
          status: 'error',
          errorMessage: ocrResult.error || 'Unknown error occurred'
        };
        
        setUploadedDocuments(prev => 
          prev.map(doc => 
            doc.id === newDocId ? errorDoc : doc
          )
        );
        
        toast({
          variant: "destructive",
          title: "Processing Failed",
          description: ocrResult.error || 'Failed to process document'
        });
        
        return errorDoc;
      }
    } catch (error) {
      console.error('Document upload error:', error);
      
      // Update document with error status
      const errorDoc: UploadedDocument = {
        ...newDocument,
        status: 'error',
        errorMessage: 'An unexpected error occurred'
      };
      
      setUploadedDocuments(prev => 
        prev.map(doc => 
          doc.id === newDocId ? errorDoc : doc
        )
      );
      
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: "An unexpected error occurred while processing the document."
      });
      
      return errorDoc;
    }
  };

  const updateExtractedText = (documentId: string, newText: string) => {
    setUploadedDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, extractedText: newText } 
          : doc
      )
    );
    
    toast({
      title: "Text Updated",
      description: "The extracted text has been updated."
    });
  };

  return {
    getDocumentById,
    getDocumentTypeById,
    uploadDocument,
    updateExtractedText
  };
};
