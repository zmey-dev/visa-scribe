
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { VisaApplication } from '@/types';

interface UseApplicationFormProps {
  initialData?: VisaApplication;
}

export const useApplicationForm = ({ initialData }: UseApplicationFormProps) => {
  const { createOrUpdateVisaApplication } = useApp();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<VisaApplication>(
    initialData || {
      id: '',
      userId: '',
      status: 'draft',
      personalDetails: {
        familyName: '',
        givenNames: '',
        dob: '',
        gender: '',
        passportNumber: '',
        passportExpiry: '',
        nationality: '',
      },
      contactDetails: {
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      educationDetails: {
        institution: '',
        courseTitle: '',
        coeNumber: '',
        courseStartDate: '',
        courseEndDate: '',
      },
      financialDetails: {
        fundsAvailable: '',
        fundingSource: '',
      },
    }
  );
  
  const handleChange = (
    section: keyof Omit<VisaApplication, 'id' | 'userId' | 'status' | 'submissionDate'>, 
    field: string, 
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save the application
    const applicationId = createOrUpdateVisaApplication(formData);
    
    if (applicationId) {
      toast({
        title: "Application Saved",
        description: initialData ? "Your changes have been saved." : "Your application has been created."
      });
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
};
