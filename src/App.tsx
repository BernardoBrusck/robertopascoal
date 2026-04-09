import { useState, useCallback, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/admin/Login";
import Home from "./pages/Home";
import Livro from "./pages/Livro";
import SobreMim from "./pages/SobreMim";
import Palestras from "./pages/Palestras";
import Galeria from "./pages/Galeria";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Posts = lazy(() => import("./pages/admin/Posts"));
const PostEditor = lazy(() => import("./pages/admin/PostEditor"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const Media = lazy(() => import("./pages/admin/Media"));
const Leads = lazy(() => import("./pages/admin/Leads"));
const Tags = lazy(() => import("./pages/admin/Tags"));
const BlogPreview = lazy(() => import("./pages/admin/BlogPreview"));

const queryClient = new QueryClient();

const AdminFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
  </div>
);

const HomeWithLoading = () => {
  return <Home />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeWithLoading />} />
              <Route path="/home" element={<Home />} />
              <Route path="/e-book" element={<Livro />} /> 
              <Route path="/sobre-mim" element={<SobreMim />} />
              <Route path="/palestras" element={<Palestras />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/blog/preview/:id" element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}><BlogPreview /></Suspense>
                </ProtectedRoute>
              } />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<AdminFallback />}>
                      <AdminLayout />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Suspense fallback={<AdminFallback />}><Dashboard /></Suspense>} />
                <Route path="posts" element={<Suspense fallback={<AdminFallback />}><Posts /></Suspense>} />
                <Route path="posts/new" element={<Suspense fallback={<AdminFallback />}><PostEditor /></Suspense>} />
                <Route path="posts/:id/edit" element={<Suspense fallback={<AdminFallback />}><PostEditor /></Suspense>} />
                <Route path="categories" element={<Suspense fallback={<AdminFallback />}><Categories /></Suspense>} />
                <Route path="tags" element={<Suspense fallback={<AdminFallback />}><Tags /></Suspense>} />
                <Route path="media" element={<Suspense fallback={<AdminFallback />}><Media /></Suspense>} />
                <Route path="leads" element={<Suspense fallback={<AdminFallback />}><Leads /></Suspense>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
