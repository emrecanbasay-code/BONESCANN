export interface Detection {
  name: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export interface PredictionResponse {
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

export interface PredictionError {
  detail: string;
}

const API_URL = process.env.NEXT_PUBLIC_HF_API_URL || "";

export async function detectFracture(
  file: File,
  confThreshold?: number
): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", file);
  if (confThreshold !== undefined) {
    formData.append("conf_threshold", confThreshold.toString());
  }

  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error: PredictionError = await response.json();
    throw new Error(error.detail || "Prediction failed");
  }

  return response.json();
}

export async function healthCheck(): Promise<{ status: string }> {
  const response = await fetch(`${API_URL}/health`);
  return response.json();
}
