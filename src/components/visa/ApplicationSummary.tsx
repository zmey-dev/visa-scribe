
import { Button } from '@/components/ui/button';
import { VisaApplication } from '@/types';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ApplicationSummaryProps {
  application: VisaApplication;
}

export const ApplicationSummary = ({ application }: ApplicationSummaryProps) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">Draft</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Submitted</Badge>;
      case 'review':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">Under Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Student Visa Application</h2>
          <p className="text-sm text-muted-foreground">
            Application ID: {application.id}
          </p>
        </div>
        {getStatusBadge(application.status)}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Personal Details</h3>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Name:</span> {application.personalDetails.givenNames} {application.personalDetails.familyName}
            </p>
            <p>
              <span className="font-medium">Nationality:</span> {application.personalDetails.nationality}
            </p>
            <p>
              <span className="font-medium">Passport:</span> {application.personalDetails.passportNumber}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Education Details</h3>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Institution:</span> {application.educationDetails.institution}
            </p>
            <p>
              <span className="font-medium">Course:</span> {application.educationDetails.courseTitle}
            </p>
            <p>
              <span className="font-medium">Duration:</span> {new Date(application.educationDetails.courseStartDate).toLocaleDateString()} to {new Date(application.educationDetails.courseEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Application Status</h3>
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
            <div 
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                application.status === 'draft' 
                  ? 'bg-amber-500 w-1/5' 
                  : application.status === 'submitted' 
                  ? 'bg-blue-500 w-2/5' 
                  : application.status === 'review' 
                  ? 'bg-purple-500 w-3/5' 
                  : application.status === 'approved' 
                  ? 'bg-green-500 w-full' 
                  : application.status === 'rejected' 
                  ? 'bg-red-500 w-4/5' 
                  : 'bg-gray-500 w-0'
              }`}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Draft</span>
            <span>Submitted</span>
            <span>Under Review</span>
            <span>Decision</span>
            <span>Complete</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end gap-4">
        <Button asChild variant="outline">
          <Link to={`/application/edit/${application.id}`}>Edit Application</Link>
        </Button>
        
        {application.status === 'draft' ? (
          <Button className="bg-visa-primary hover:bg-visa-secondary">
            Submit Application
          </Button>
        ) : (
          <Button asChild>
            <Link to={`/application/view/${application.id}`}>View Details</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
