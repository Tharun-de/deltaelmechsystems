import React, { useState } from 'react';
import { X, File, Image, FileText, FileSpreadsheet, Presentation } from 'lucide-react';

interface DocumentPreviewProps {
  document: {
    id: string;
    name: string;
    type: string;
    url: string;
  };
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-8 w-8" />;
    if (type === 'application/pdf') return <FileText className="h-8 w-8" />;
    if (type.includes('spreadsheet')) return <FileSpreadsheet className="h-8 w-8" />;
    if (type.includes('presentation')) return <Presentation className="h-8 w-8" />;
    return <File className="h-8 w-8" />;
  };

  const renderPreview = () => {
    const fileType = document.type.toLowerCase();

    if (fileType.startsWith('image/')) {
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
          <img
            src={document.url}
            alt={document.name}
            className="max-w-full max-h-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError('Failed to load image');
              setIsLoading(false);
            }}
          />
        </div>
      );
    }

    if (fileType === 'application/pdf') {
      return (
        <iframe
          src={document.url}
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError('Failed to load PDF');
            setIsLoading(false);
          }}
        />
      );
    }

    // For other file types, show a download prompt
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="mb-4 p-4 bg-gray-100 rounded-full">
          {getFileIcon(fileType)}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{document.name}</h3>
        <p className="text-sm text-gray-500 mb-4">
          This file type cannot be previewed. Please download to view.
        </p>
        <a
          href={document.url}
          download
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Download File
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
        <div className="w-screen max-w-2xl">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    {getFileIcon(document.type)}
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 truncate">
                    {document.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-y-auto">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <a
                      href={document.url}
                      download
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  {renderPreview()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview; 