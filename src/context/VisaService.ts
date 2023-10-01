
import { VisaApplication } from '@/types';
import { useToast } from '@/hooks/use-toast';

export interface VisaServiceProps {
  currentUserId: string | null;
  setVisaApplications: React.Dispatch<React.SetStateAction<VisaApplication[]>>;
  visaApplications: VisaApplication[];
  userEmail: string;
}

export const useVisaService = ({
  currentUserId,
  setVisaApplications,
  visaApplications,
  userEmail
}: VisaServiceProps) => {
  const { toast } = useToast();

  const getVisaApplicationById = (id: string) => {
    return visaApplications.find(app => app.id === id);
  };

  const createOrUpdateVisaApplication = (applicationData: Partial<VisaApplication>): string => {
    if (!currentUserId) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to manage visa applications."
      });
      return '';
    }

    // Check if updating existing application
    if (applicationData.id) {
      setVisaApplications(prev => 
        prev.map(app => 
          app.id === applicationData.id 
            ? { ...app, ...applicationData } 
            : app
        )
      );
      
      toast({
        title: "Application Updated",
        description: "Your visa application has been updated."
      });
      
      return applicationData.id;
    } else {
      // Create new application
      const newId = `va${Date.now()}`;
      const newApplication: VisaApplication = {
        id: newId,
        userId: currentUserId,
        status: 'draft',
        personalDetails: {
          familyName: applicationData.personalDetails?.familyName || '',
          givenNames: applicationData.personalDetails?.givenNames || '',
          dob: applicationData.personalDetails?.dob || '',
          gender: applicationData.personalDetails?.gender || '',
          passportNumber: applicationData.personalDetails?.passportNumber || '',
          passportExpiry: applicationData.personalDetails?.passportExpiry || '',
          nationality: applicationData.personalDetails?.nationality || '',
        },
        contactDetails: {
          email: applicationData.contactDetails?.email || userEmail,
          phone: applicationData.contactDetails?.phone || '',
          address: applicationData.contactDetails?.address || '',
          city: applicationData.contactDetails?.city || '',
          state: applicationData.contactDetails?.state || '',
          postalCode: applicationData.contactDetails?.postalCode || '',
          country: applicationData.contactDetails?.country || '',
        },
        educationDetails: {
          institution: applicationData.educationDetails?.institution || '',
          courseTitle: applicationData.educationDetails?.courseTitle || '',
          coeNumber: applicationData.educationDetails?.coeNumber || '',
          courseStartDate: applicationData.educationDetails?.courseStartDate || '',
          courseEndDate: applicationData.educationDetails?.courseEndDate || '',
        },
        financialDetails: {
          fundsAvailable: applicationData.financialDetails?.fundsAvailable || '',
          fundingSource: applicationData.financialDetails?.fundingSource || '',
        }
      };
      
      setVisaApplications(prev => [...prev, newApplication]);
      
      toast({
        title: "Application Created",
        description: "Your new visa application has been created."
      });
      
      return newId;
    }
  };

  return {
    getVisaApplicationById,
    createOrUpdateVisaApplication
  };
};
