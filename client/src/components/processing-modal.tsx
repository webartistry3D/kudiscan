import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  imageUrl?: string;
}

export function ProcessingModal({ isOpen, onClose, progress, imageUrl }: ProcessingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Processing Receipt</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            data-testid="button-cancel-processing"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 p-6">
          {/* Receipt Preview */}
          {imageUrl && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <img 
                  src={imageUrl} 
                  alt="Receipt being processed" 
                  className="w-full h-48 object-contain rounded"
                  data-testid="img-receipt-preview"
                />
              </CardContent>
            </Card>
          )}

          {/* Processing Status */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="text-white w-3 h-3" />
              </div>
              <span className="text-gray-900">Image captured successfully</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                {progress < 100 ? (
                  <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Check className="text-white w-3 h-3" />
                )}
              </div>
              <span className="text-gray-900">
                {progress < 50 ? 'Extracting text with OCR...' : 
                 progress < 100 ? 'Processing receipt data...' :
                 'Text extraction complete'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                progress >= 100 ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {progress >= 100 ? (
                  <Check className="text-white w-3 h-3" />
                ) : (
                  <div className="w-3 h-3 border-2 border-gray-400 rounded-full" />
                )}
              </div>
              <span className={progress >= 100 ? 'text-gray-900' : 'text-gray-500'}>
                Categorizing expenses
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
                data-testid="progress-processing"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Processing... {progress}% complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
