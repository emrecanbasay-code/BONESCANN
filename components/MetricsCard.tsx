"use client";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: "blue" | "green" | "purple" | "red";
}

const colorStyles = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
  },
};

export default function MetricsCard({
  title,
  value,
  icon,
  color,
}: MetricsCardProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-2 ${styles.border} hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 ${styles.bg} rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div>
          <p className={`text-sm font-medium ${styles.text} mb-1`}>{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
