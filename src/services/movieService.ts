import useAxios from "../hooks/axioshooks";
import { ApiRoutes } from "../constants/ApiRoutes";
import { IMovie } from "../interfaces/movies";

const axios = useAxios();

export const getMovies = async (): Promise<IMovie[]> => {
    const { data } = await axios.get<IMovie[]>(ApiRoutes.Movies);
    return data;
}

export const getMovieById = async (movieId: number): Promise<IMovie> => {
    const { data } = await axios.get<IMovie>(`${ApiRoutes.Movies}/${movieId}`);
    return data;
}

export const addMovie = async (newMovie: IMovie): Promise<IMovie> => {
    const { data } = await axios.post<IMovie>(ApiRoutes.Movies, newMovie);
    return data;
}

export const deleteMovie = async (movieId: number) => {
    await axios.delete<IMovie>(`${ApiRoutes.Movies}/${movieId}`);
}
