
import { DocumentType, UploadedDocument, User, VisaApplication } from '@/types';

export interface AppContextType {
  currentUser: User | null;
  documentTypes: DocumentType[];
  uploadedDocuments: UploadedDocument[];
  visaApplications: VisaApplication[];
  uploadDocument: (file: File, documentTypeId: string) => Promise<UploadedDocument | null>;
  getDocumentById: (id: string) => UploadedDocument | undefined;
  getDocumentTypeById: (id: string) => DocumentType | undefined;
  updateExtractedText: (documentId: string, newText: string) => void;
  createOrUpdateVisaApplication: (application: Partial<VisaApplication>) => string;
  getVisaApplicationById: (id: string) => VisaApplication | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
