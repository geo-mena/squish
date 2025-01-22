import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { ImageFile } from '../types';
import { Card } from "../ui/card.tsx";

interface DropZoneProps {
  onFilesDrop: (files: ImageFile[]) => void;
}

export function DropZone({ onFilesDrop }: DropZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files)
      .filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('jxl'))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        status: 'pending' as const,
        originalSize: file.size,
      }));
    onFilesDrop(files);
  }, [onFilesDrop]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
      .filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('jxl'))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        status: 'pending' as const,
        originalSize: file.size,
      }));
    onFilesDrop(files);
    e.target.value = '';
  }, [onFilesDrop]);

  return (
    <Card
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors dark:hover:border-blue-800"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        multiple
        accept="image/*,.jxl"
        onChange={handleFileInput}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Drop images here or click to upload
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supports JPEG, PNG, WebP, AVIF, and JXL
          </p>
        </div>
      </label>
    </Card>
  );
}