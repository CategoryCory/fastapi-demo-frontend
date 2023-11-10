import { useEffect, useState } from "react";
import { useGetMovies } from "../hooks/moviehooks";

export default function AverageMovieRating() {
    const [avgRating, setAvgRating] = useState<number>(0);
    const { data: movies } = useGetMovies();

    useEffect(() => {
        if (movies == null || movies.length === 0) {
            setAvgRating(0);
        } else {
            const average = movies.reduce((acc, movie) => acc + movie.rating, 0) / movies.length;
            setAvgRating(average);
        }
    }, [movies]);

    return (
        <div className="max-w-[350px] px-6 py-4 bg-white border-2 border-gray-200 rounded">
            <h4 className="text-sm text-gray-500">Average Movie Rating</h4>
            <p className="text-gray-800 text-8xl">{ avgRating.toFixed(2) }</p>
        </div>
    )
}
