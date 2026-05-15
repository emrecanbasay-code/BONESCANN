"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResultsView from "@/components/ResultsView";
import MetricsCard from "@/components/MetricsCard";
import { UploadState, PredictionResult } from "@/types";
import { detectFracture } from "@/lib/api";

export default function Home() {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: null,
    loading: false,
    error: null,
    result: null,
  });
  const [confThreshold, setConfThreshold] = useState(0.25);

  const handleFileSelect = async (file: File) => {
    const preview = URL.createObjectURL(file);
    setUploadState({
      file,
      preview,
      loading: true,
      error: null,
      result: null,
    });

    try {
      const result = await detectFracture(file, confThreshold);
      setUploadState((prev) => ({
        ...prev,
        loading: false,
        result,
      }));
    } catch (error) {
      setUploadState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Prediction failed",
      }));
    }
  };

  const handleReset = () => {
    if (uploadState.preview) {
      URL.revokeObjectURL(uploadState.preview);
    }
    setUploadState({
      file: null,
      preview: null,
      loading: false,
      error: null,
      result: null,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🦴</span>
            <h1 className="text-4xl font-bold text-slate-800">
              Bone Fracture Detection
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            AI-powered fracture detection using YOLOv7. Upload an X-ray image to
            detect potential fractures.
          </p>
          <p className="text-sm text-amber-600 mt-2">
            ⚠️ This tool is for educational and research purposes only. Not for
            medical diagnosis.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <label className="text-sm font-medium text-slate-700">
                Confidence Threshold: {(confThreshold * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={confThreshold}
                onChange={(e) => setConfThreshold(parseFloat(e.target.value))}
                className="w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                disabled={uploadState.loading}
              />
            </div>

            <ImageUploader
              onFileSelect={handleFileSelect}
              loading={uploadState.loading}
              disabled={uploadState.loading}
            />

            {uploadState.error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700">{uploadState.error}</p>
              </div>
            )}
          </div>

          {uploadState.result && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricsCard
                  title="Fractures Detected"
                  value={uploadState.result.count}
                  icon="🔍"
                  color="blue"
                />
                <MetricsCard
                  title="Avg Confidence"
                  value={`${(uploadState.result.avg_confidence * 100).toFixed(1)}%`}
                  icon="📊"
                  color="green"
                />
                <MetricsCard
                  title="Max Confidence"
                  value={`${(uploadState.result.max_confidence * 100).toFixed(1)}%`}
                  icon="🎯"
                  color="purple"
                />
              </div>

              <ResultsView result={uploadState.result} />

              <div className="text-center mt-8">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  Analyze Another Image
                </button>
              </div>
            </>
          )}
        </div>

        <footer className="text-center mt-16 text-slate-500 text-sm">
          <p>
            Powered by YOLOv7 • Built with Next.js & FastAPI • Deployed on
            Vercel & Hugging Face
          </p>
        </footer>
      </div>
    </main>
  );
}
