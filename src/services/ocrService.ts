
import { mockExtractedTexts } from "./mockData";

// Simulates encoding a file to Base64
export const encodeFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64String = reader.result?.toString().split(',')[1] || '';
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
};

// Define return type interfaces for parsed document data
export interface ParsedPassportData {
  type: 'passport';
  passportNumber: string;
  surname: string;
  givenNames: string;
  nationality: string;
  dob: string;
  gender: string;
  expiryDate: string;
}

export interface ParsedCoeData {
  type: 'coe';
  provider: string;
  courseTitle: string;
  coeNumber: string;
  startDate: string;
  endDate: string;
}

export interface ParsedBankStatementData {
  type: 'bankStatement';
  accountName: string;
  accountNumber: string;
  closingBalance: string;
}

export interface ParsedEnglishTestData {
  type: 'englishTest';
  candidateName: string;
  overallScore: string;
  listeningScore: string;
  readingScore: string;
  writingScore: string;
  speakingScore: string;
}

export interface ParsedGenericData {
  type: 'generic';
  rawText: string;
}

export type ParsedDocumentData = 
  | ParsedPassportData 
  | ParsedCoeData 
  | ParsedBankStatementData 
  | ParsedEnglishTestData 
  | ParsedGenericData;

// Mock function to simulate sending to Google Vision API
export const processDocumentWithOCR = async (
  file: File, 
  documentTypeId: string
): Promise<{ success: boolean; text: string | null; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Get file extension
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  // Simulating errors for certain file types
  if (fileExtension === 'gif') {
    return { 
      success: false, 
      text: null, 
      error: 'Unsupported file format. Please upload PDF, JPG, or PNG.'
    };
  }
  
  // Simulate random failures (10% chance)
  if (Math.random() < 0.1) {
    return {
      success: false,
      text: null,
      error: 'OCR processing failed. The document may be blurry or contain unreadable text.'
    };
  }
  
  // Return mock data based on document type
  let extractedText = '';
  
  switch(documentTypeId) {
    case 'dt1': // Passport
      extractedText = mockExtractedTexts.passport;
      break;
    case 'dt2': // CoE
      extractedText = mockExtractedTexts.coe;
      break;
    case 'dt3': // Bank Statement
      extractedText = mockExtractedTexts.bankStatement;
      break;
    case 'dt4': // English Test
      extractedText = mockExtractedTexts.englishTest;
      break;
    default:
      extractedText = `Sample extracted text for document type ${documentTypeId}\n\nThis is some mock OCR data that would typically be returned by the Google Vision API. The actual content would depend on the document uploaded.`;
  }
  
  return {
    success: true,
    text: extractedText
  };
};

// Mock function to parse extracted text and get structured data
export const parseExtractedText = (documentTypeId: string, text: string): ParsedDocumentData => {
  switch(documentTypeId) {
    case 'dt1': // Passport
      const passportData: ParsedPassportData = {
        type: 'passport',
        passportNumber: text.match(/Passport No:\s*([A-Z0-9]+)/i)?.[1] || '',
        surname: text.match(/Surname:\s*([A-Z\s]+)/i)?.[1] || '',
        givenNames: text.match(/Given Names:\s*([A-Z\s]+)/i)?.[1] || '',
        nationality: text.match(/Nationality:\s*([A-Z\s]+)/i)?.[1] || '',
        dob: text.match(/Date of Birth:\s*([0-9]{1,2}\s[A-Z]{3}\s[0-9]{4})/i)?.[1] || '',
        gender: text.match(/Gender:\s*([MF])/i)?.[1] || '',
        expiryDate: text.match(/Date of Expiry:\s*([0-9]{1,2}\s[A-Z]{3}\s[0-9]{4})/i)?.[1] || '',
      };
      return passportData;
      
    case 'dt2': // CoE
      const coeData: ParsedCoeData = {
        type: 'coe',
        provider: text.match(/Provider:\s*([A-Z\s]+)/i)?.[1] || '',
        courseTitle: text.match(/Course:\s*([A-Z\s]+)/i)?.[1] || '',
        coeNumber: text.match(/Reference Number:\s*([A-Z0-9]+)/i)?.[1] || '',
        startDate: text.match(/Start Date:\s*([0-9]{1,2}\s[A-Z]{3}\s[0-9]{4})/i)?.[1] || '',
        endDate: text.match(/End Date:\s*([0-9]{1,2}\s[A-Z]{3}\s[0-9]{4})/i)?.[1] || '',
      };
      return coeData;
      
    case 'dt3': // Bank Statement
      const bankData: ParsedBankStatementData = {
        type: 'bankStatement',
        accountName: text.match(/Account Name:\s*([A-Z\s]+)/i)?.[1] || '',
        accountNumber: text.match(/Account Number:\s*([0-9-\s]+)/i)?.[1] || '',
        closingBalance: text.match(/CLOSING BALANCE:\s*(\$[0-9,.]+)/i)?.[1] || '',
      };
      return bankData;
      
    case 'dt4': // English Test
      const englishTestData: ParsedEnglishTestData = {
        type: 'englishTest',
        candidateName: text.match(/Candidate Name:\s*([A-Z\s]+)/i)?.[1] || '',
        overallScore: text.match(/OVERALL BAND SCORE:\s*([0-9.]+)/i)?.[1] || '',
        listeningScore: text.match(/Listening:\s*([0-9.]+)/i)?.[1] || '',
        readingScore: text.match(/Reading:\s*([0-9.]+)/i)?.[1] || '',
        writingScore: text.match(/Writing:\s*([0-9.]+)/i)?.[1] || '',
        speakingScore: text.match(/Speaking:\s*([0-9.]+)/i)?.[1] || '',
      };
      return englishTestData;
      
    default:
      return { type: 'generic', rawText: text };
  }
};
