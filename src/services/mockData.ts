
import { DocumentType, UploadedDocument, User, VisaApplication } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "student"
  },
  {
    id: "u2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "student"
  }
];

// Mock Document Types
export const mockDocumentTypes: DocumentType[] = [
  {
    id: "dt1",
    name: "Passport",
    required: true,
    description: "Passport identification page with photo and personal details"
  },
  {
    id: "dt2",
    name: "Confirmation of Enrollment (CoE)",
    required: true,
    description: "Official CoE document from your Australian education institution"
  },
  {
    id: "dt3",
    name: "Bank Statement",
    required: true,
    description: "Recent bank statement showing financial capability"
  },
  {
    id: "dt4",
    name: "English Proficiency Test",
    required: true,
    description: "IELTS, TOEFL, PTE or equivalent English test result"
  },
  {
    id: "dt5",
    name: "Overseas Student Health Cover (OSHC)",
    required: false,
    description: "Proof of health insurance coverage for your stay in Australia"
  }
];

// Mock Extracted Text from Documents
export const mockExtractedTexts = {
  passport: `PASSPORT
  Type: P
  Country Code: KOR
  Passport No: M12345678
  Surname: KIM
  Given Names: MINJUN
  Nationality: REPUBLIC OF KOREA
  Date of Birth: 15 MAR 1998
  Gender: M
  Place of Birth: SEOUL
  Date of Issue: 20 JAN 2020
  Date of Expiry: 19 JAN 2030
  Authority: MINISTRY OF FOREIGN AFFAIRS`,
  
  coe: `ELECTRONIC CONFIRMATION OF ENROLLMENT
  Provider: UNIVERSITY OF SYDNEY
  Provider Code: 00026A
  Reference Number: 157832649X
  Course: MASTER OF INFORMATION TECHNOLOGY
  Course Code: CRICOS 082912M
  Start Date: 15 FEB 2023
  End Date: 14 DEC 2024
  Study Mode: FULL TIME
  Student ID: 456329871`,
  
  bankStatement: `COMMONWEALTH BANK
  STATEMENT OF ACCOUNT
  Account Name: KIM MINJUN
  Account Number: 062-345 1234 5678
  BSB: 062-345
  Statement Period: 01 APR 2023 - 30 APR 2023
  
  OPENING BALANCE: $52,450.75
  
  TRANSACTIONS:
  01 APR 2023 - INTEREST PAYMENT - $45.32
  05 APR 2023 - TRANSFER TO RENT - $850.00
  12 APR 2023 - GROCERY SHOPPING - $124.56
  18 APR 2023 - MOBILE PHONE BILL - $65.00
  25 APR 2023 - DEPOSIT - $2,000.00
  
  CLOSING BALANCE: $53,456.51`,
  
  englishTest: `INTERNATIONAL ENGLISH LANGUAGE TESTING SYSTEM
  Test Report Form
  Test Date: 10 JAN 2023
  Candidate Name: KIM MINJUN
  Candidate No: 002346198
  Date of Birth: 15 MAR 1998
  Country of Origin: REPUBLIC OF KOREA
  
  TEST RESULTS:
  Listening: 8.5
  Reading: 8.0
  Writing: 7.0
  Speaking: 7.5
  
  OVERALL BAND SCORE: 7.5`
};

// Mock Uploaded Documents
export const mockUploadedDocuments: UploadedDocument[] = [
  {
    id: "doc1",
    userId: "u1",
    documentTypeId: "dt1",
    fileName: "passport.jpg",
    fileUrl: "https://picsum.photos/id/1/800/600",
    uploadDate: "2023-05-10T09:25:00Z",
    status: "completed",
    extractedText: mockExtractedTexts.passport
  },
  {
    id: "doc2",
    userId: "u1",
    documentTypeId: "dt2",
    fileName: "coe_university.pdf",
    fileUrl: "https://picsum.photos/id/20/800/600",
    uploadDate: "2023-05-10T10:15:00Z",
    status: "completed",
    extractedText: mockExtractedTexts.coe
  },
  {
    id: "doc3",
    userId: "u1",
    documentTypeId: "dt3",
    fileName: "bank_statement_april.pdf",
    fileUrl: "https://picsum.photos/id/42/800/600",
    uploadDate: "2023-05-11T14:35:00Z",
    status: "completed",
    extractedText: mockExtractedTexts.bankStatement
  },
  {
    id: "doc4",
    userId: "u1",
    documentTypeId: "dt4",
    fileName: "ielts_result.pdf",
    fileUrl: "https://picsum.photos/id/60/800/600",
    uploadDate: "2023-05-11T15:20:00Z",
    status: "completed",
    extractedText: mockExtractedTexts.englishTest
  }
];

// Mock Visa Applications
export const mockVisaApplications: VisaApplication[] = [
  {
    id: "va1",
    userId: "u1",
    status: "draft",
    personalDetails: {
      familyName: "KIM",
      givenNames: "MINJUN",
      dob: "1998-03-15",
      gender: "Male",
      passportNumber: "M12345678",
      passportExpiry: "2030-01-19",
      nationality: "REPUBLIC OF KOREA"
    },
    contactDetails: {
      email: "john.smith@example.com",
      phone: "+82 10-1234-5678",
      address: "123 Gangnam Street",
      city: "Seoul",
      state: "Seoul",
      postalCode: "06000",
      country: "Republic of Korea"
    },
    educationDetails: {
      institution: "UNIVERSITY OF SYDNEY",
      courseTitle: "MASTER OF INFORMATION TECHNOLOGY",
      coeNumber: "157832649X",
      courseStartDate: "2023-02-15",
      courseEndDate: "2024-12-14"
    },
    financialDetails: {
      fundsAvailable: "$53,456.51",
      fundingSource: "Personal Savings"
    }
  }
];
