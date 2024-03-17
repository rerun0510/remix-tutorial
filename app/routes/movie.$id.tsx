import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjQ2NjdlNmNmMzJlMTg1MTEwMmQ1YmViZGFiZDcxZiIsInN1YiI6IjY1ZTQ4NWI5ZmUwNzdhMDE4NTExMGQ0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pz8FoyPJ4gpMDL-E9g8uG9-GD_ceiFEz9smmYOvKvhQ`,
      },
    }
  )
  const data = (await url.json()) as {
    backdrop_path: string
    title: string
    homepage: string
    original_language: string
    overview: string
    release_date: string
  }
  return json(data)
}

export default function MovieId() {
  const data = useLoaderData<typeof loader>()

  console.log(data)
  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[40vh] object-cover w-full rounded-lg"
      />

      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage</span>{' '}
            <Link to={data.homepage} target="_blank" rel="noreferrer">
              Link
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language</span>{' '}
            {data.original_language}
          </h1>

          <p>
            <span className="underline">Overview: </span>
            {data.overview}
          </p>

          <p>
            <span className="underline">Release Date: </span>
            {data.release_date}
          </p>
        </div>

        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
