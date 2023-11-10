import { useGetMovies, useDeleteMovie } from "../hooks/moviehooks";

export default function MovieList() {
    const { data: movies } = useGetMovies();

    const { mutate: deleteMovie } = useDeleteMovie();

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour12: true,
        timeZone: "America/New_York",
    }

    const handleDelete = (movieId: number) => {
        deleteMovie(movieId);
    }

    if (movies?.length === 0) {
        return <p className="mt-8 text-gray-500">There are currently no movies listed.</p>
    }

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block max-w-4xl py-2 align-middle sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold">Current Movies</h2>
                    <table className="max-w-4xl divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Title</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Genre</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Release Date</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {movies?.map(movie => (
                                <tr key={movie.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 space-y-1 sm:pl-0">
                                        <p className="text-gray-800 font-extrabold">{movie.title}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <p className="text-gray-600">{movie.description}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <p className="text-gray-600">{movie.genre}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <p className="text-gray-600">{movie.rating}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <p className="text-gray-600">{new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(movie.release_date!))}</p>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button 
                                            type="button"
                                            className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-200"
                                            onClick={() => handleDelete(movie.id!)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
