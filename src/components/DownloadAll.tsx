import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface DownloadAllProps {
  onDownloadAll: () => void;
  count: number;
}

export function DownloadAll({ onDownloadAll, count }: DownloadAllProps) {
  return (
    <Button
      variant="secondary"
      onClick={onDownloadAll}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors dark:bg-green-600 dark:hover:bg-green-700"
    >
      <Download className="w-5 h-5" />
      Download All ({count} {count === 1 ? 'image' : 'images'})
    </Button>
  );
}