import { createContext, useState } from "react";
export const MovieContext = createContext({});
// eslint-disable-next-line react/prop-types
function MovieContextProvider({children}) {    
    const [movieCol,setMovieCol] = useState();
    return ( <MovieContext.Provider value={{movieCol,setMovieCol}}>
        {children}
    </MovieContext.Provider> );
}

export default MovieContextProvider;