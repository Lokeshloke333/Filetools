"use client";

import React from "react";
import { ToolLayout } from "@/components/tool/ToolLayout";
import { ToolHeader } from "@/components/tool/ToolHeader";
import { UploadArea } from "@/components/tool/UploadArea";
import { ToolSettings } from "@/components/tool/ToolSettings";
import { RelatedTools } from "@/components/tool/RelatedTools";
import { FAQSection } from "@/components/tool/FAQSection";
import { AboutTool } from "@/components/tool/AboutTool";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb, Unlock, Shield } from "lucide-react";
import { usePdfUnlock } from "@/hooks/usePdfUnlock";
import { PdfUnlockPreview } from "@/components/tool/PdfUnlockPreview";
import { PdfUnlockOptions } from "@/components/tool/PdfUnlockOptions";
import { PdfUnlockResultCard } from "@/components/tool/PdfUnlockResultCard";
import { useDownload } from "@/hooks/useDownload";
import { FILE_LIMITS } from "@/lib/config";

export default function UnlockPdfPage() {
  const {
    fileInfo,
    password,
    setPassword,
    handleFileSelect,
    clearAll,
    unlockFile,
    isProcessing,
    statusMessage,
    result,
    uploadError,
    clearUploadError,
    passwordError,
  } = usePdfUnlock();

  const { handleDownload } = useDownload();

  const faqs = [
    {
      question: "Can this tool hack or bypass a PDF password?",
      answer: "No. This tool requires you to know and provide the correct password to unlock the document. It does not attempt to hack, guess, or brute-force passwords. It simply removes the password requirement for future use if you provide the correct one.",
    },
    {
      question: "Will my password be saved or logged?",
      answer: "Absolutely not. Your password is only used in memory for the exact moment of unlocking the PDF and is immediately discarded. We never log or store it.",
    },
    {
      question: "Are my files secure?",
      answer: "Yes! Your files are transmitted securely, processed immediately, and instantly deleted after unlocking. We do not store or read your documents.",
    },
  ];

  return (
    <ToolLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Header, Upload & Preview */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ToolHeader 
            title="Unlock PDF"
            subtitle="Remove password protection securely by providing the correct password."
            icon={<Unlock className="w-6 h-6" />}
          />
          
          {!result && !fileInfo && (
            <UploadArea 
              acceptedFormats="PDF"
              maxSizeMB={FILE_LIMITS.PDF_MAX_SIZE_MB}
              onFileSelect={handleFileSelect}
              multiple={false}
              error={uploadError}
              onErrorClear={clearUploadError}
            />
          )}

          {!result && fileInfo && (
            <div className="mt-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 px-1">
                Protected Document
              </h3>
              <PdfUnlockPreview 
                fileInfo={fileInfo} 
                onRemove={clearAll} 
              />
            </div>
          )}

          {result && (
            <PdfUnlockResultCard 
              result={result} 
              onDownload={() => handleDownload(result.url, result.filename)} 
              onReset={clearAll} 
            />
          )}
        </div>

        {/* Right Side: Settings / Actions */}
        <div className="lg:col-span-1">
          <ToolSettings>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Security</h3>
                  <p className="text-sm text-slate-500">Enter Document Password</p>
                </div>
              </div>
              
              <PdfUnlockOptions 
                password={password}
                setPassword={setPassword}
                error={passwordError}
                disabled={isProcessing || result !== null || !fileInfo}
              />
            </div>

            {/* Action Button */}
            <div className="pt-2 pb-2">
              <Button 
                size="lg" 
                className="w-full h-14 rounded-2xl text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 transition-all disabled:opacity-70 disabled:shadow-none"
                onClick={unlockFile}
                disabled={!fileInfo || isProcessing || result !== null}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {statusMessage || "Processing..."}
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5 mr-2" />
                    Unlock PDF
                  </>
                )}
              </Button>
            </div>

            {/* Pro Tip */}
            <div className="mt-auto bg-green-50/50 border border-green-100 rounded-2xl p-4 flex gap-3">
              <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 leading-relaxed font-medium">
                <span className="font-bold">Pro Tip:</span> This tool removes the password permanently so you don't have to enter it every time you open the document.
              </p>
            </div>

          </ToolSettings>
        </div>

      </div>

      <RelatedTools />
      <FAQSection faqs={faqs} />
      
      <AboutTool 
        title="About Unlock PDF"
        content={
          <>
            <p>
              Our Unlock PDF tool allows you to permanently remove the password from a protected PDF document. This is highly useful for bank statements, tax forms, or personal records that you want to store and access quickly without repeatedly typing a complex password.
            </p>
            <p>
              We process everything securely on our servers without storing your files or passwords. Your password is only used in memory to decrypt the file during processing, and once your unlocked file is generated, all data is immediately discarded ensuring your privacy is fully protected.
            </p>
          </>
        }
      />

    </ToolLayout>
  );
}
