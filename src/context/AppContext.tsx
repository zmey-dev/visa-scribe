
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DocumentType, UploadedDocument, User, VisaApplication } from '@/types';
import { mockDocumentTypes, mockUploadedDocuments, mockUsers, mockVisaApplications } from '@/services/mockData';
import { AppContextType } from './types';
import { useDocumentService } from './DocumentService';
import { useVisaService } from './VisaService';
import { useAuthService } from './AuthService';

// Create the context with an undefined default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Export the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);

  // Initialize auth service
  const authService = useAuthService({
    setCurrentUser
  });

  // Initialize document service
  const documentService = useDocumentService({
    currentUserId: currentUser?.id || null,
    setUploadedDocuments,
    uploadedDocuments,
    documentTypes
  });

  // Initialize visa application service
  const visaService = useVisaService({
    currentUserId: currentUser?.id || null,
    setVisaApplications,
    visaApplications,
    userEmail: currentUser?.email || ''
  });

  // Load mock data on mount
  useEffect(() => {
    setDocumentTypes(mockDocumentTypes);
    
    // Load data if user is logged in
    if (currentUser) {
      // Filter documents for current user
      const userDocuments = mockUploadedDocuments.filter(
        doc => doc.userId === currentUser.id
      );
      setUploadedDocuments(userDocuments);
      
      // Filter visa applications for current user
      const userApplications = mockVisaApplications.filter(
        app => app.userId === currentUser.id
      );
      setVisaApplications(userApplications);
    } else {
      setUploadedDocuments([]);
      setVisaApplications([]);
    }
  }, [currentUser]);

  // Initialize with the first mock user (for demo purposes)
  useEffect(() => {
    // Auto login for demo purposes
    setCurrentUser(mockUsers[0]);
  }, []);

  const value: AppContextType = {
    currentUser,
    documentTypes,
    uploadedDocuments,
    visaApplications,
    ...documentService,
    ...visaService,
    ...authService
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Export the hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
