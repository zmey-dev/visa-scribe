
import { Button } from '@/components/ui/button';
import { UploadedDocument } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface DocumentCardProps {
  document: UploadedDocument;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const { getDocumentTypeById, updateExtractedText } = useApp();
  const [editableText, setEditableText] = useState(document.extractedText || '');
  const documentType = getDocumentTypeById(document.documentTypeId);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'uploading':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Uploading</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">Processing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Completed</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleSaveText = () => {
    updateExtractedText(document.id, editableText);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{documentType?.name || 'Document'}</h3>
        {getStatusBadge(document.status)}
      </div>
      
      <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
        <img 
          src={document.fileUrl} 
          alt={document.fileName}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="text-sm">
        <p className="truncate mb-1" title={document.fileName}>
          {document.fileName}
        </p>
        <p className="text-muted-foreground">
          Uploaded: {formatDate(document.uploadDate)}
        </p>
      </div>
      
      {document.status === 'error' ? (
        <div className="mt-3 text-sm text-red-600">
          {document.errorMessage || 'An error occurred processing this document'}
        </div>
      ) : document.status === 'completed' ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-3 bg-visa-primary hover:bg-visa-secondary">
              View Extracted Text
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Extracted Text from {document.fileName}</DialogTitle>
              <DialogDescription>
                Review and edit the extracted text if necessary
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
              />
            </div>
            
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaveText}
                className="bg-visa-primary hover:bg-visa-secondary"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button disabled className="w-full mt-3">
          {document.status === 'processing' ? (
            <>
              <span className="animate-pulse mr-2">●</span>
              Processing...
            </>
          ) : (
            'Uploading...'
          )}
        </Button>
      )}
    </div>
  );
};
