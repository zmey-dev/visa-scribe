
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { VisaApplication } from '@/types';
import { PersonalDetailsForm } from './form/PersonalDetailsForm';
import { ContactDetailsForm } from './form/ContactDetailsForm';
import { EducationDetailsForm } from './form/EducationDetailsForm';
import { FinancialDetailsForm } from './form/FinancialDetailsForm';
import { AutoFillButton } from './form/AutoFillButton';
import { useApplicationForm } from './form/useApplicationForm';

interface ApplicationFormProps {
  initialData?: VisaApplication;
}

export const ApplicationForm = ({ initialData }: ApplicationFormProps) => {
  const { uploadedDocuments } = useApp();
  
  const { formData, setFormData, handleChange, handleSubmit } = useApplicationForm({ initialData });

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Student Visa Application - Subclass 500</h2>
        <AutoFillButton 
          uploadedDocuments={uploadedDocuments} 
          formData={formData} 
          setFormData={setFormData} 
        />
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
            <TabsTrigger value="education">Education Details</TabsTrigger>
            <TabsTrigger value="financial">Financial Details</TabsTrigger>
          </TabsList>
          
          {/* Personal Details Tab */}
          <TabsContent value="personal" className="space-y-4">
            <PersonalDetailsForm 
              personalDetails={formData.personalDetails} 
              handleChange={handleChange} 
            />
          </TabsContent>
          
          {/* Contact Details Tab */}
          <TabsContent value="contact" className="space-y-4">
            <ContactDetailsForm 
              contactDetails={formData.contactDetails} 
              handleChange={handleChange} 
            />
          </TabsContent>
          
          {/* Education Details Tab */}
          <TabsContent value="education" className="space-y-4">
            <EducationDetailsForm 
              educationDetails={formData.educationDetails} 
              handleChange={handleChange} 
            />
          </TabsContent>
          
          {/* Financial Details Tab */}
          <TabsContent value="financial" className="space-y-4">
            <FinancialDetailsForm 
              financialDetails={formData.financialDetails} 
              handleChange={handleChange} 
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-visa-primary hover:bg-visa-secondary">
            {initialData ? 'Update Application' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};
