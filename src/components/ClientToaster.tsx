"use client";

import { Toaster, ToastBar, toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function ClientToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#2C2C2C",
          color: "#fff",
          borderRadius: "8px",
          fontFamily: "Lato, sans-serif",
          fontSize: "13px",
          padding: "10px 14px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          border: "1px solid #3E3E3E",
        },
        success: {
          duration: 4000,
          iconTheme: { primary: "#C9A84C", secondary: "#fff" },
        },
        error: {
          duration: 5000,
          iconTheme: { primary: "#C8687A", secondary: "#fff" },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-2">
              {icon}
              <div className="flex-1 text-xs">{message}</div>
              {t.type !== "loading" && (
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className="ml-2 p-1 rounded-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Close notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
