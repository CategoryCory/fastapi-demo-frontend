import { Slide, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieCount from "./components/MovieCount";
import MovieForm from "./components/MovieForm";
import MovieList from './components/MovieList';
import AverageMovieRating from "./components/AverageMovieRating";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer 
        position="bottom-right"
        theme="light"
        transition={Slide}
        pauseOnHover={false}
        draggable
      />
        <MovieForm />
        <div className="mx-6 mt-10 space-y-6">
          <div className="flex gap-6">
            <MovieCount />
            <AverageMovieRating />
          </div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <MovieList />
        </Suspense>
        </div>
    </QueryClientProvider>
  )
}
