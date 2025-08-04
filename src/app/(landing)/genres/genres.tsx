"use client";
/* eslint-disable @next/next/no-img-element */

import { IGenre } from "@/app/admin/genre/model-def";
import { getImg } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import Link from "next/link";



interface GenreListingProps {
  genres: IGenre[]
}

function GenreListing({ genres = [] }: GenreListingProps) {
  // Group genres by category, handling array of categories
 const genresByCategory = genres.reduce(
    (acc, genre) => {
      // Handle undefined or empty categories by assigning to "Others"
      const categories = genre.categories && genre.categories.length > 0 ? genre.categories : ["Others"]

      // For each category in the genre's category array
      categories.forEach((cat) => {
        if (!acc[cat]) {
          acc[cat] = []
        }
        // Only add the genre if it's not already in this category
        if (!acc[cat].some((existingGenre) => existingGenre.name === genre.name)) {
          acc[cat].push(genre)
        }
      })
      return acc
    },
    {} as Record<string, IGenre[]>,
  )

  // Sort categories alphabetically
  const sortedCategories = Object.keys(genresByCategory).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Genres</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of genres organized by category
          </p>
        </div>

        {sortedCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No genres available</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedCategories.map((category) => (
              <section key={category} className="space-y-6">
                <div className="flex items-center space-x-4 px-6">
                  <h2 className="text-2xl font-semibold text-gray-800 capitalize">{category}</h2>
                  <div className="flex-1 h-px bg-orange-800"></div>
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                    {genresByCategory[category].length} genres
                  </span>
                </div>

                <div className="overflow-x-auto px-6">
                  <div className="flex space-x-6 pb-4" style={{ minWidth: "max-content" }}>
                    {genresByCategory[category].map((genre) => (
                     
                       
                    <Link  key={`${category}-${genre._id}`} href={`/books?genres=${genre.name}`}>
                         <div
                       
                        className="group relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden flex-shrink-0 w-64"
                      >
                        {/* Genre Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={
                               genre?.upload ? getImg(genre.upload) : "/dummy.png"
                            }
                            alt={genre.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                          {/* Color accent bar */}
                          <div className="absolute top-0 left-0 h-1 w-full bg-blue-500"></div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors text-center">
                            {genre.name}
                          </h3>
                        </div>
{/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                      </div>
                    </Link>

                        
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Example usage with sample data - now with array categories


// Demo component - make sure this is exported
export function GenreListingDemo() {
    const { isLoading, data, isError, error } = useFetch(
        [KY.genre],
        `${KY.genre}`,
        {status: "active", limit:100 }
      );
  return (<GenreListing genres={data?.body||[]} />)
}

export default GenreListingDemo

