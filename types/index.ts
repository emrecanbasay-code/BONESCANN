export interface Detection {
  name: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export interface PredictionResult {
  success: boolean;
  detections: Detection[];
  count: number;
  avg_confidence: number;
  max_confidence: number;
  images: {
    original: string;
    annotated: string;
  };
}

export interface UploadState {
  file: File | null;
  preview: string | null;
  loading: boolean;
  error: string | null;
  result: PredictionResult | null;
}
