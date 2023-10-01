
import { Layout } from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { LandingPage } from "@/components/landing/LandingPage";

const Index = () => {
  const { currentUser, uploadedDocuments, visaApplications, documentTypes } = useApp();

  return (
    <Layout>
      <div className="container py-8">
        {currentUser ? (
          <UserDashboard
            currentUser={currentUser}
            documentTypes={documentTypes}
            uploadedDocuments={uploadedDocuments}
            visaApplications={visaApplications}
          />
        ) : (
          <LandingPage />
        )}
      </div>
    </Layout>
  );
};

export default Index;
