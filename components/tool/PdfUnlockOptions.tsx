import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PdfUnlockOptionsProps {
  password: string;
  setPassword: (val: string) => void;
  disabled: boolean;
  error?: string | null;
}

export function PdfUnlockOptions({ password, setPassword, disabled, error }: PdfUnlockOptionsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={disabled}
          placeholder="Enter PDF password"
          className={`w-full h-14 pl-4 pr-12 rounded-2xl border-2 bg-white text-slate-800 outline-none transition-all placeholder:text-slate-400
            ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-green-500"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none disabled:opacity-50"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium px-2 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
