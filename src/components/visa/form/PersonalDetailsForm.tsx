
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VisaApplication } from '@/types';

interface PersonalDetailsFormProps {
  personalDetails: VisaApplication['personalDetails'];
  handleChange: (section: 'personalDetails', field: string, value: string) => void;
}

export const PersonalDetailsForm = ({ personalDetails, handleChange }: PersonalDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="familyName">Family Name</Label>
        <Input
          id="familyName"
          value={personalDetails.familyName}
          onChange={(e) => handleChange('personalDetails', 'familyName', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="givenNames">Given Names</Label>
        <Input
          id="givenNames"
          value={personalDetails.givenNames}
          onChange={(e) => handleChange('personalDetails', 'givenNames', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          value={personalDetails.dob}
          onChange={(e) => handleChange('personalDetails', 'dob', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={personalDetails.gender}
          onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="passportNumber">Passport Number</Label>
        <Input
          id="passportNumber"
          value={personalDetails.passportNumber}
          onChange={(e) => handleChange('personalDetails', 'passportNumber', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="passportExpiry">Passport Expiry Date</Label>
        <Input
          id="passportExpiry"
          type="date"
          value={personalDetails.passportExpiry}
          onChange={(e) => handleChange('personalDetails', 'passportExpiry', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nationality">Nationality</Label>
        <Input
          id="nationality"
          value={personalDetails.nationality}
          onChange={(e) => handleChange('personalDetails', 'nationality', e.target.value)}
        />
      </div>
    </div>
  );
};
