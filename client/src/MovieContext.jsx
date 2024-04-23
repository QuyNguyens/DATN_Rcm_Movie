import { createContext, useState } from "react";
export const MovieContext = createContext({});
// eslint-disable-next-line react/prop-types
function MovieContextProvider({children}) {    
    const [movieCol,setMovieCol] = useState({
        movieNew: [],
        movieHot: [],
        movieRcm: [],
        movieClb: []
    });
    const [searchMovie,setSearchMovie] = useState([]);
    const [isOpenVip,setIsOpenVip] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    return ( <MovieContext.Provider value={{openLogin,setOpenLogin,movieCol,setMovieCol,setSearchMovie,searchMovie,isOpenVip,setIsOpenVip}}>
        {children}
    </MovieContext.Provider> );
}

export default MovieContextProvider;