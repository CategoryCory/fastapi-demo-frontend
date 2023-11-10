import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddMovie } from "../hooks/moviehooks";
import { IMovie } from "../interfaces/movies";

type FormInputs = {
    title: string;
    description: string;
    genre: string;
    rating: number;
    release_date: Date;
}

export default function MovieForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormInputs>();
    
    const {
        mutate: addMovie,
        // isLoading: isAddMessageLoading,
        // isError: isAddMessageError
    } = useAddMovie();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset])

    const onSubmit: SubmitHandler<FormInputs> = async data => {
        const newMovie: IMovie = { 
            title: data.title,
            description: data.description,
            genre: data.genre,
            rating: data.rating,
            release_date: data.release_date,
        };

        try {
            addMovie(newMovie);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form 
            className="mx-6 my-4 flex flex-col max-w-xl gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input 
                {...register("title", { /* required: true, */ maxLength: 255 })}
                type="text"
                placeholder="Movie Title"
                className="w-full px-4 py-2 font-mono rounded-md border-2 border-slate-400 focus:ring-0 focus:border-indigo-600 transition duration-150"
            />
            { errors.title && <span className="px-4 py-2 bg-red-100 text-red-800 rounded">The title is required.</span> }
            <textarea 
                {...register("description", { required: true, maxLength: 255 })}
                rows={5}
                placeholder="Movie Description"
                className="w-full px-4 py-2 font-mono rounded-md border-2 border-slate-400 focus:ring-0 focus:border-indigo-600 transition duration-150"
            ></textarea>
            { errors.description && <span className="px-4 py-2 bg-red-100 text-red-800 rounded">This field is required.</span> }
            <input 
                {...register("genre", { required: true, maxLength: 50 })}
                type="text"
                placeholder="Movie Genre"
                className="w-full px-4 py-2 font-mono rounded-md border-2 border-slate-400 focus:ring-0 focus:border-indigo-600 transition duration-150"
            />
            { errors.genre && <span className="px-4 py-2 bg-red-100 text-red-800 rounded">This field is required.</span> }
            <input 
                {...register("rating", { required: true, min: 0, max: 10 })}
                type="number"
                step={0.1}
                placeholder="Movie Rating"
                className="w-full px-4 py-2 font-mono rounded-md border-2 border-slate-400 focus:ring-0 focus:border-indigo-600 transition duration-150"
            />
            { errors.rating && <span className="px-4 py-2 bg-red-100 text-red-800 rounded">This field is required and must be between 0 and 10.</span> }
            <input 
                {...register("release_date", { required: true })}
                type="date"
                placeholder="Movie Release Date"
                className="w-full px-4 py-2 font-mono rounded-md border-2 border-slate-400 focus:ring-0 focus:border-indigo-600 transition duration-150"
            />
            { errors.release_date && <span className="px-4 py-2 bg-red-100 text-red-800 rounded">This field is required.</span> }
            <input type="submit" value="Add Movie" className="btn btn-secondary" />
        </form>
    );
}
