import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateLesson from "./pages/CreateLesson";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import ViewAllLessons from "./pages/ViewAllLessons";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <ProtectedRoute fallback={<Auth onSuccess={() => window.location.reload()} />}>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-lesson" 
                element={
                  <ProtectedRoute fallback={<Auth onSuccess={() => window.location.reload()} />}>
                    <CreateLesson />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <ProtectedRoute fallback={<Auth onSuccess={() => window.location.reload()} />}>
                    <Messages />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute fallback={<Auth onSuccess={() => window.location.reload()} />}>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lessons" 
                element={
                  <ProtectedRoute fallback={<Auth onSuccess={() => window.location.reload()} />}>
                    <ViewAllLessons />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute fallback={<Auth onSuccess={() => window.location.reload()} />}>
                    <AnalyticsDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
