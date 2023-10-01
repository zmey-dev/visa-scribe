
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface DocumentType {
  id: string;
  name: string;
  required: boolean;
  description: string;
}

export interface UploadedDocument {
  id: string;
  userId: string;
  documentTypeId: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  extractedText: string | null;
  errorMessage?: string;
}

export interface VisaApplication {
  id: string;
  userId: string;
  status: 'draft' | 'review' | 'submitted' | 'approved' | 'rejected';
  submissionDate?: string;
  personalDetails: {
    familyName: string;
    givenNames: string;
    dob: string;
    gender: string;
    passportNumber: string;
    passportExpiry: string;
    nationality: string;
  };
  contactDetails: {
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  educationDetails: {
    institution: string;
    courseTitle: string;
    coeNumber: string;
    courseStartDate: string;
    courseEndDate: string;
  };
  financialDetails: {
    fundsAvailable: string;
    fundingSource: string;
  };
}
