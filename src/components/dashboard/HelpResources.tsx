
import { Button } from "@/components/ui/button";

export const HelpResources = () => {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="font-medium mb-2">Help & Resources</h2>
      <ul className="space-y-3 text-sm">
        <li className="flex gap-2">
          <div className="h-6 w-6 rounded-full bg-visa-light flex items-center justify-center">
            <span className="text-visa-primary">1</span>
          </div>
          <div>
            <p className="font-medium">Upload Required Documents</p>
            <p className="text-muted-foreground">Passport, CoE, financial documents</p>
          </div>
        </li>
        <li className="flex gap-2">
          <div className="h-6 w-6 rounded-full bg-visa-light flex items-center justify-center">
            <span className="text-visa-primary">2</span>
          </div>
          <div>
            <p className="font-medium">Complete Application Form</p>
            <p className="text-muted-foreground">Fill in all required fields</p>
          </div>
        </li>
        <li className="flex gap-2">
          <div className="h-6 w-6 rounded-full bg-visa-light flex items-center justify-center">
            <span className="text-visa-primary">3</span>
          </div>
          <div>
            <p className="font-medium">Submit for Processing</p>
            <p className="text-muted-foreground">Review and submit your application</p>
          </div>
        </li>
      </ul>
      <Button variant="link" className="w-full mt-4">
        View Visa Requirements
      </Button>
    </div>
  );
};
