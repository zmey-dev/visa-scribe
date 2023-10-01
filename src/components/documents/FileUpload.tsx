
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { DocumentType } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FileUploadProps {
  onUploadComplete?: () => void;
}

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const { documentTypes, uploadDocument } = useApp();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTypeId, setDocumentTypeId] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentTypeId) return;
    
    setIsUploading(true);
    
    try {
      await uploadDocument(selectedFile, documentTypeId);
      setSelectedFile(null);
      setDocumentTypeId('');
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Document Type</label>
          <Select value={documentTypeId} onValueChange={setDocumentTypeId}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((docType: DocumentType) => (
                <SelectItem key={docType.id} value={docType.id}>
                  {docType.name} {docType.required && '(Required)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {documentTypeId && (
            <p className="text-xs text-muted-foreground mt-2">
              {documentTypes.find(dt => dt.id === documentTypeId)?.description}
            </p>
          )}
        </div>
        
        <div
          className={`file-drop-area ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-10 h-10 text-visa-primary mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm font-semibold">
              {selectedFile 
                ? `Selected: ${selectedFile.name}` 
                : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, JPG or PNG (max. 10MB)
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !documentTypeId || isUploading}
            className="bg-visa-primary hover:bg-visa-secondary"
          >
            {isUploading ? 'Processing...' : 'Upload & Process'}
          </Button>
        </div>
      </div>
    </div>
  );
};
