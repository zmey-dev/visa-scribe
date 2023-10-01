
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VisaApplication } from '@/types';

interface FinancialDetailsFormProps {
  financialDetails: VisaApplication['financialDetails'];
  handleChange: (section: 'financialDetails', field: string, value: string) => void;
}

export const FinancialDetailsForm = ({ financialDetails, handleChange }: FinancialDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fundsAvailable">Available Funds</Label>
        <Input
          id="fundsAvailable"
          value={financialDetails.fundsAvailable}
          onChange={(e) => handleChange('financialDetails', 'fundsAvailable', e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Enter the total amount of funds available for your stay in Australia
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fundingSource">Source of Funds</Label>
        <select
          id="fundingSource"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={financialDetails.fundingSource}
          onChange={(e) => handleChange('financialDetails', 'fundingSource', e.target.value)}
        >
          <option value="">Select funding source</option>
          <option value="Personal Savings">Personal Savings</option>
          <option value="Family Support">Family Support</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Bank Loan">Bank Loan</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};
