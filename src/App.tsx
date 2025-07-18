
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import RentalAgreement from "./pages/RentalAgreement";
import AdminPanel from "./pages/AdminPanel";
import UserProfile from "./components/UserProfile";
import StampDutyCalculator from "./pages/StampDutyCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Global prevention of mouse wheel scrolling on number inputs
  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is a number input or within a number input
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'number') {
        e.preventDefault();
        e.stopPropagation();
        (target as HTMLInputElement).blur();
        return false;
      }
    };

    const handleFocusEvent = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Prevent wheel events when number inputs are focused
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'number') {
        const wheelHandler = (event: WheelEvent) => {
          event.preventDefault();
          event.stopPropagation();
        };
        target.addEventListener('wheel', wheelHandler, { passive: false });
        
        // Clean up when input loses focus
        const blurHandler = () => {
          target.removeEventListener('wheel', wheelHandler);
          target.removeEventListener('blur', blurHandler);
        };
        target.addEventListener('blur', blurHandler, { once: true });
      }
    };

    // Add global event listeners
    document.addEventListener('wheel', handleWheelEvent, { passive: false });
    document.addEventListener('focus', handleFocusEvent, true);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('wheel', handleWheelEvent);
      document.removeEventListener('focus', handleFocusEvent, true);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rental-agreement" element={<RentalAgreement />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/stamp-duty-calculator" element={<StampDutyCalculator />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
