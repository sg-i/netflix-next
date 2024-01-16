import React from "react";
import useSWR from "swr"
import fetcher from "../lib/fetcher";

interface filtersInterface{
    activeGenre: string;
    sort: string;
    typeSort: string;
    search?: string | string[];
}

const useFilterMovies = (filters:filtersInterface)=>{
    const {activeGenre, sort, typeSort, search} = filters;
    const {data, error, isLoading, mutate} = useSWR(`/api/movies?genre=${activeGenre}&sort=${sort}&typesort=${typeSort}&search=${search}`, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    return {
        data,
        isLoading
    }
}
export default useFilterMovies;