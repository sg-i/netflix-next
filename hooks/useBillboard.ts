import useSWR from 'swr'

import fetcher from '../lib/fetcher'
import { Movie } from '../types/movie'



const useBillboard = ()=>{
    const {data,error,isLoading}=useSWR<Movie>('/api/random',fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return{
        data,error,isLoading
    }
}

export default useBillboard;