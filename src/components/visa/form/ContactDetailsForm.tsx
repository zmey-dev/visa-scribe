
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VisaApplication } from '@/types';

interface ContactDetailsFormProps {
  contactDetails: VisaApplication['contactDetails'];
  handleChange: (section: 'contactDetails', field: string, value: string) => void;
}

export const ContactDetailsForm = ({ contactDetails, handleChange }: ContactDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={contactDetails.email}
          onChange={(e) => handleChange('contactDetails', 'email', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={contactDetails.phone}
          onChange={(e) => handleChange('contactDetails', 'phone', e.target.value)}
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={contactDetails.address}
          onChange={(e) => handleChange('contactDetails', 'address', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={contactDetails.city}
          onChange={(e) => handleChange('contactDetails', 'city', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="state">State/Province</Label>
        <Input
          id="state"
          value={contactDetails.state}
          onChange={(e) => handleChange('contactDetails', 'state', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          value={contactDetails.postalCode}
          onChange={(e) => handleChange('contactDetails', 'postalCode', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={contactDetails.country}
          onChange={(e) => handleChange('contactDetails', 'country', e.target.value)}
        />
      </div>
    </div>
  );
};
