import { toast } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ServerStateKeys } from "../constants/ServerStateKeys";
import { IMovie } from "../interfaces/movies";
import { getMovies, getMovieById, addMovie, deleteMovie } from "../services/movieService";

export const useGetMovies = () => {
    return useQuery<IMovie[], Error>([ServerStateKeys.Movies], () => getMovies());
}

export const useGetMovie = (movieId: number) => {
    return useQuery<IMovie, Error>([ServerStateKeys.Movie, movieId], () => getMovieById(movieId));
}

export const useAddMovie = () => {
    const queryClient = useQueryClient();

    return useMutation<IMovie, Error, IMovie>(addMovie, {
        onSuccess: () => {
            queryClient.invalidateQueries([ServerStateKeys.Movies]);
            toast.success("New movie successfully added!");
        },
        onError: (error) => {
            toast.error(`An error occurred: ${error}`);
        }
    });
}

export const useDeleteMovie = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteMovie, {
        onSuccess: () => {
            queryClient.invalidateQueries([ServerStateKeys.Movies]);
            toast.success("Movie successfully deleted.");
        },
        onError: (error) => {
            toast.error(`An error occurred: ${error}`);
        }
    });
}
