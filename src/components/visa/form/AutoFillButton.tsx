
import React from 'react';
import { Button } from '@/components/ui/button';
import { UploadedDocument, VisaApplication } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { parseExtractedText } from '@/services/ocrService';

interface AutoFillButtonProps {
  uploadedDocuments: UploadedDocument[];
  formData: VisaApplication;
  setFormData: React.Dispatch<React.SetStateAction<VisaApplication>>;
}

export const AutoFillButton = ({ uploadedDocuments, formData, setFormData }: AutoFillButtonProps) => {
  const { toast } = useToast();

  const autofillFromDocuments = () => {
    // Find documents by type
    const passportDoc = uploadedDocuments.find(doc => doc.documentTypeId === 'dt1' && doc.extractedText);
    const coeDoc = uploadedDocuments.find(doc => doc.documentTypeId === 'dt2' && doc.extractedText);
    const bankDoc = uploadedDocuments.find(doc => doc.documentTypeId === 'dt3' && doc.extractedText);
    
    let newFormData = { ...formData };
    
    // Autofill from passport
    if (passportDoc?.extractedText) {
      const parsedData = parseExtractedText('dt1', passportDoc.extractedText);
      
      // Convert date format if needed (15 MAR 1998 -> 1998-03-15)
      const convertDate = (dateStr: string) => {
        try {
          if (!dateStr) return '';
          const date = new Date(dateStr);
          return date.toISOString().split('T')[0];
        } catch {
          return dateStr;
        }
      };
      
      if (parsedData.type === 'passport') {
        newFormData.personalDetails = {
          ...newFormData.personalDetails,
          familyName: parsedData.surname || newFormData.personalDetails.familyName,
          givenNames: parsedData.givenNames || newFormData.personalDetails.givenNames,
          dob: convertDate(parsedData.dob) || newFormData.personalDetails.dob,
          gender: parsedData.gender === 'M' ? 'Male' : parsedData.gender === 'F' ? 'Female' : newFormData.personalDetails.gender,
          passportNumber: parsedData.passportNumber || newFormData.personalDetails.passportNumber,
          passportExpiry: convertDate(parsedData.expiryDate) || newFormData.personalDetails.passportExpiry,
          nationality: parsedData.nationality || newFormData.personalDetails.nationality,
        };
      }
    }
    
    // Autofill from COE
    if (coeDoc?.extractedText) {
      const parsedData = parseExtractedText('dt2', coeDoc.extractedText);
      
      // Convert date format if needed
      const convertDate = (dateStr: string) => {
        try {
          if (!dateStr) return '';
          const date = new Date(dateStr);
          return date.toISOString().split('T')[0];
        } catch {
          return dateStr;
        }
      };
      
      if (parsedData.type === 'coe') {
        newFormData.educationDetails = {
          ...newFormData.educationDetails,
          institution: parsedData.provider || newFormData.educationDetails.institution,
          courseTitle: parsedData.courseTitle || newFormData.educationDetails.courseTitle,
          coeNumber: parsedData.coeNumber || newFormData.educationDetails.coeNumber,
          courseStartDate: convertDate(parsedData.startDate) || newFormData.educationDetails.courseStartDate,
          courseEndDate: convertDate(parsedData.endDate) || newFormData.educationDetails.courseEndDate,
        };
      }
    }
    
    // Autofill from bank statement
    if (bankDoc?.extractedText) {
      const parsedData = parseExtractedText('dt3', bankDoc.extractedText);
      
      if (parsedData.type === 'bankStatement') {
        newFormData.financialDetails = {
          ...newFormData.financialDetails,
          fundsAvailable: parsedData.closingBalance || newFormData.financialDetails.fundsAvailable,
          fundingSource: 'Personal Savings', // Default assumption
        };
      }
    }
    
    setFormData(newFormData);
    
    toast({
      title: "Auto-Fill Complete",
      description: "Form has been filled with data from your documents."
    });
  };

  return (
    <Button onClick={autofillFromDocuments} variant="outline">
      Auto-Fill from Documents
    </Button>
  );
};
