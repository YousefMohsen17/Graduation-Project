import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoadingPage from "./components/LoadingPage";
import StudyTimerProvider from "./providers/studyTimerProvider";
import AiPage from "./pages/AI-Assistant/AiPage";
import { AiChatProvider } from "./context/AiChatContext";
import { checkAuth } from "./lib/api";

// Lazy load all pages
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const SignupPage = lazy(() => import("./pages/signup/SignupPage"));
const SigninPage = lazy(() => import("./pages/signin/SigninPage"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const CoursesPage = lazy(() => import("./pages/courses/CoursesPage"));
const SubjectDetailsPage = lazy(
  () => import("./pages/courses/SubjectDetailsPage"),
);
const CommunityPage = lazy(() => import("./pages/community/CommunityPage"));
const UserActivity = lazy(() => import("./pages/community/UserActivity"));
const ProgressPage = lazy(() => import("./pages/progress/ProgressPage"));

const queryClient = new QueryClient(); // ✅ moved outside component

const router = createBrowserRouter([
  // ✅ moved outside component
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/courses", element: <CoursesPage /> },
          { path: "/courses/:id", element: <SubjectDetailsPage /> },
          { path: "/ai-assistant", element: <AiPage /> },
          { path: "/community", element: <CommunityPage /> },
          { path: "/community/user/:id", element: <UserActivity /> },
          { path: "/progress", element: <ProgressPage /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/sign-up", element: <SignupPage /> },
      { path: "/sign-in", element: <SigninPage /> },
    ],
  },
]);

// ✅ AuthLoader inside QueryClientProvider
function AuthLoader() {
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <StudyTimerProvider />
      <Toaster />
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AiChatProvider>
        <AuthLoader />
      </AiChatProvider>
    </QueryClientProvider>
  );
}

export default App;
