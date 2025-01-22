import { Card, CardContent } from "../ui/card";
import type { OutputType, CompressionOptions } from "../types";

interface CompressionOptionsProps {
  options: CompressionOptions;
  outputType: OutputType;
  onOptionsChange: (options: CompressionOptions) => void;
  onOutputTypeChange: (type: OutputType) => void;
}

export function CompressionOptions({
  options,
  outputType,
  onOptionsChange,
  onOutputTypeChange,
}: CompressionOptionsProps) {
  return (
    <Card className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <CardContent className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
          Output Format
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {(["avif", "jpeg", "jxl", "png", "webp"] as const).map((format) => (
            <button
              key={format}
              className={`px-4 py-2 rounded-md text-sm font-medium uppercase ${
                outputType === format
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onOutputTypeChange(format)}
            >
              {format}
            </button>
          ))}
        </div>

        {outputType !== "png" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              Quality: {options.quality}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={options.quality}
              onChange={(e) =>
                onOptionsChange({ quality: Number(e.target.value) })
              }
              className="w-full dark:accent-blue-600"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
