import { useEffect, useState } from "react";
import { useGetMovies } from "../hooks/moviehooks";

export default function MovieCount() {
    const [movieCount, setMovieCount] = useState<number>(0);
    const { data: movies } = useGetMovies();

    useEffect(() => {
        setMovieCount(movies?.length ?? 0);
    }, [movies?.length]);


    return (
        <div className="max-w-[350px] px-6 py-4 bg-white border-2 border-gray-200 rounded">
            <h4 className="text-sm text-gray-500">Movie Count</h4>
            <p className="text-gray-800 text-8xl">{ movieCount }</p>
        </div>
    );
};
