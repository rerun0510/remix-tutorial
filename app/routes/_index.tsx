import { json, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

type GetMovieRes = {
  page: number
  results: {
    id: number
    poster_path: string
    title: string
    overview: string
  }[]
}

export async function loader() {
  const url = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjQ2NjdlNmNmMzJlMTg1MTEwMmQ1YmViZGFiZDcxZiIsInN1YiI6IjY1ZTQ4NWI5ZmUwNzdhMDE4NTExMGQ0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pz8FoyPJ4gpMDL-E9g8uG9-GD_ceiFEz9smmYOvKvhQ`,
      },
    }
  )

  const data = (await url.json()) as GetMovieRes
  return json(data)
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Top Trending Movies
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {data.results.map((result) => (
            <div
              className="flex flex-col overflow-hidden rounded-lg border bg-white"
              key={result.id}
            >
              <Link
                prefetch="intent"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                to={`movie/${result.id}/comments`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover  object-center transition duration-288 group-hover:scale-110"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <Link
                    to={`movie/${result.id}/comments`}
                    prefetch="intent"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    {result.title}
                  </Link>
                </h2>

                <p className="text-gray-500 line-clamp-3">{result.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
