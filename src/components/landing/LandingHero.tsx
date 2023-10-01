
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LandingHero = () => {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Streamline Your Australian Student Visa Application
      </h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
        Our OCR-powered platform extracts data from your documents to
        pre-fill your visa application, making the process faster and error-free.
      </p>
      
      <div className="flex gap-4">
        <Button size="lg" className="bg-visa-primary hover:bg-visa-secondary" asChild>
          <Link to="/register">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};
