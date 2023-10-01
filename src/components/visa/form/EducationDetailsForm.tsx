
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VisaApplication } from '@/types';

interface EducationDetailsFormProps {
  educationDetails: VisaApplication['educationDetails'];
  handleChange: (section: 'educationDetails', field: string, value: string) => void;
}

export const EducationDetailsForm = ({ educationDetails, handleChange }: EducationDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="institution">Educational Institution</Label>
        <Input
          id="institution"
          value={educationDetails.institution}
          onChange={(e) => handleChange('educationDetails', 'institution', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="courseTitle">Course Title</Label>
        <Input
          id="courseTitle"
          value={educationDetails.courseTitle}
          onChange={(e) => handleChange('educationDetails', 'courseTitle', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="coeNumber">CoE Number</Label>
        <Input
          id="coeNumber"
          value={educationDetails.coeNumber}
          onChange={(e) => handleChange('educationDetails', 'coeNumber', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="courseStartDate">Course Start Date</Label>
        <Input
          id="courseStartDate"
          type="date"
          value={educationDetails.courseStartDate}
          onChange={(e) => handleChange('educationDetails', 'courseStartDate', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="courseEndDate">Course End Date</Label>
        <Input
          id="courseEndDate"
          type="date"
          value={educationDetails.courseEndDate}
          onChange={(e) => handleChange('educationDetails', 'courseEndDate', e.target.value)}
        />
      </div>
    </div>
  );
};
