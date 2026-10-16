import { Toaster } from "react-hot-toast";
import { CustomerProfileProvider } from "@/context/CustomerProfileContext";

/**
 * Auth layout — no Navbar or Footer.
 * Wraps with CustomerProfileProvider so login/register can call registerCustomer/loginCustomer.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerProfileProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#2C2C2C",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "13px",
          },
          success: {
            iconTheme: { primary: "#C9A84C", secondary: "#fff" },
          },
        }}
      />
    </CustomerProfileProvider>
  );
}
