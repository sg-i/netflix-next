import { NextApiRequest,NextApiResponse } from "next";

import prismadb from '../../../lib/prismadb'
import serverAuth from "../../../lib/serverAuth";
import { Prisma } from "@prisma/client";

function generateSorting(sort:string | string[], typeSort: string | string[]){
    const validate = () =>{
        if(typeSort==='Ascending'){
            return 'asc'
        }
        return 'desc'
    }

    const validSort = validate()
    let sortFilter:any={}
    if(sort==='Views'){
        sortFilter.views=validSort 
    }
    if(sort==='Title'){
        sortFilter.title=validSort 
    }
    if(sort==='Year'){
        sortFilter.year=validSort 
    }
    return sortFilter
}
function generateGenre(genre: string | string[]){
    const validateGenre = typeof genre ==='string' ? genre : genre[0]
    const genreWithUpperCase = validateGenre.charAt(0).toUpperCase() + validateGenre.slice(1);
    console.log('val',genreWithUpperCase)
    return genreWithUpperCase
}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method!=='GET'){
        return res.status(405).end()
    }

    try {
        const checkAuth = await serverAuth(req, res);
        const {genre, sort, typesort: typeSort} = req.query;
        console.log(req.query)
        if(genre && sort && typeSort){
            // /api/movies?genre=action&sort=views&typesort=asc
            const moviesQuery: any = {
                orderBy: generateSorting(sort, typeSort)
              };
              
              if (genre !== 'All') {
                moviesQuery.where = {
                  genre: generateGenre(genre)
                };
              }
            const movies = await prismadb.movie.findMany(moviesQuery)
            return res.status(200).json(movies)
        } else {
            // /api/movies
            const movies = await prismadb.movie.findMany({
                orderBy: {
                    views:"desc"
                }
            })
            return res.status(200).json(movies);
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}