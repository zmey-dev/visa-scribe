
import { Layout } from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { ApplicationForm } from "@/components/visa/ApplicationForm";
import { ApplicationSummary } from "@/components/visa/ApplicationSummary";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApplicationPage = () => {
  const { visaApplications, uploadedDocuments } = useApp();
  
  // Calculate document completion status
  const hasRequiredDocuments = uploadedDocuments.some(doc => doc.status === 'completed');

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Visa Application</h1>
            <p className="text-muted-foreground mt-1">
              Australian Student Visa (Subclass 500)
            </p>
          </div>
        </div>
        
        {visaApplications.length > 0 ? (
          <div className="mb-8">
            <ApplicationSummary application={visaApplications[0]} />
            
            {/* Show application form if application is in draft status */}
            {visaApplications[0].status === 'draft' && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Edit Application</h2>
                <ApplicationForm initialData={visaApplications[0]} />
              </div>
            )}
          </div>
        ) : hasRequiredDocuments ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">New Application</h2>
            <ApplicationForm />
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Upload Documents First</h2>
            <p className="text-muted-foreground mb-6">
              Please upload your required documents before starting your visa application. 
              This allows us to pre-fill your application with extracted data.
            </p>
            <Button className="bg-visa-primary hover:bg-visa-secondary" asChild>
              <Link to="/documents">Upload Documents</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ApplicationPage;
