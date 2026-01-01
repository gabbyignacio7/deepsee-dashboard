import { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { EngineerTicketData } from '@/types/engineer-allocation';

interface CSVUploaderProps {
  onDataLoaded: (data: EngineerTicketData[], filename: string) => void;
  lastUpdated?: Date;
}

export default function CSVUploader({ onDataLoaded, lastUpdated }: CSVUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Validate required columns
          const requiredColumns = ['Engineer', 'Ticket_ID', 'Ticket_Title', 'Status'];
          const headers = results.meta.fields || [];
          const missingColumns = requiredColumns.filter(col => !headers.includes(col));
          
          if (missingColumns.length > 0) {
            setError(`Missing required columns: ${missingColumns.join(', ')}`);
            setUploading(false);
            return;
          }

          // Transform data to EngineerTicketData format
          const tickets: EngineerTicketData[] = results.data.map((row: any) => {
            // Normalize Story_Points: empty string/null/undefined -> null, otherwise parse as number
            let storyPoints: number | null = null;
            if (row.Story_Points !== null && row.Story_Points !== undefined && row.Story_Points !== '') {
              const parsed = Number(row.Story_Points);
              storyPoints = isNaN(parsed) ? null : parsed;
            }
            
            return {
              Engineer: row.Engineer || '',
              Ticket_ID: row.Ticket_ID || '',
              Ticket_Title: row.Ticket_Title || row.Ticket_Summary || '',
              Project: row.Project || row.Project_Key || '',
              Status: row.Status || '',
              Priority: row.Priority || 'Major',
              Story_Points: storyPoints,
              Days_In_Status: row.Days_In_Status ? Number(row.Days_In_Status) : 0,
              Epic: row.Epic || '',
              Labels: row.Labels || ''
            };
          });

          // Filter out tickets without engineers
          const validTickets = tickets.filter(t => t.Engineer && t.Engineer.trim() !== '');
          
          if (validTickets.length === 0) {
            setError('No tickets with assigned engineers found in the CSV file.');
            setUploading(false);
            return;
          }

          // Warn if many tickets are missing story points
          const missingStoryPoints = validTickets.filter(t => !t.Story_Points).length;
          const percentMissing = (missingStoryPoints / validTickets.length) * 100;
          
          if (percentMissing > 50) {
            console.warn(`${percentMissing.toFixed(0)}% of tickets are missing story points`);
          }

          onDataLoaded(validTickets, file.name);
          setUploading(false);
        } catch (err) {
          setError('Error parsing CSV file. Please check the format.');
          setUploading(false);
          console.error('CSV parsing error:', err);
        }
      },
      error: (err) => {
        setError(`CSV parsing error: ${err.message}`);
        setUploading(false);
      }
    });

    // Reset input so the same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          onClick={handleButtonClick}
          disabled={uploading}
          data-testid="button-upload-csv"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload JIRA Export (CSV)'}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          data-testid="input-file-csv"
        />
        
        {lastUpdated && (
          <span className="text-sm text-muted-foreground" data-testid="text-last-updated">
            Last updated: {lastUpdated.toLocaleString()}
          </span>
        )}
      </div>

      {error && (
        <Alert variant="destructive" data-testid="alert-csv-error">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              data-testid="button-dismiss-error"
            >
              <X className="w-4 h-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
