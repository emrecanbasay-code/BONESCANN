"use client";

import { PredictionResult } from "@/types";
import { useState } from "react";

interface ResultsViewProps {
  result: PredictionResult;
}

export default function ResultsView({ result }: ResultsViewProps) {
  const [view, setView] = useState<"annotated" | "original">("annotated");

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Detection Results</h2>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setView("annotated")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === "annotated"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Annotated
          </button>
          <button
            onClick={() => setView("original")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === "original"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Original
          </button>
        </div>

        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
          <img
            src={view === "annotated" ? result.images.annotated : result.images.original}
            alt={view === "annotated" ? "Annotated result" : "Original image"}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {result.detections.length > 0 ? (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Detected Fractures ({result.count})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                    Confidence
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                    Bounding Box
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.detections.map((det, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm text-slate-600">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {det.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${det.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-700">
                          {(det.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 font-mono">
                      [{det.bbox[0]}, {det.bbox[1]}, {det.bbox[2]}, {det.bbox[3]}]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            No Fractures Detected
          </h3>
          <p className="text-slate-600">
            The model did not detect any fractures above the confidence threshold.
            Try lowering the threshold or verify the image quality.
          </p>
        </div>
      )}
    </div>
  );
}
