import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieCast, fetchMovieTrailer } from '../Api';
import Carousel from 'react-multi-carousel';
import Footer from '../components/Footer';
import NavbarComponents from '../components/NavbarComponents';

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setMovieCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieDetail(id);
        const castResponse = await fetchMovieCast(id);
        const trailer = await fetchMovieTrailer(id);
   
        setMovie(response);
        setMovieCast(castResponse);
        setTrailerUrl(trailer);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = () => {
    setOpened(!opened);
  };

  const linkTrailer = trailerUrl ? trailerUrl.substring(32, 50) : '';

  if (!movie) {
    return <div className='text-white text-2xl w-full mx-auto uppercase'>Loading...</div>;
  }

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if(document.title === undefined) {
    return document.title = 'Detail Movie'
  }

  return (
    <div>
<title>Detail Movie</title>
      <NavbarComponents />
      <div className="relative">
        <div className="relative w-full h-[60vh] lg:h-[100vh]">
          <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute -bottom-32 z-10 md:left-10 lg:left-28 flex">
            <div className="max-w-[12rem] mx-5">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-xl" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold mt-5">{movie.title}</h1>
              <div className="flex justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 540" className="max-w-6 fill-yellow-400">
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
                <h1 className="font-semibold text-xl my-2 text-white">{movie.vote_average}/10</h1>
              </div>
              <h1 className="lg:font-semibold lg:text-xl text-white">Status: {movie.status}</h1>
              <div className="sm:block sm:m-2 lg:flex gap-3 mt-3">
                <div>
                  <button onClick={handleClick} className="font-semibold text-xl text-white bg-blue-300 rounded-xl px-3">Trailer</button>
                </div>
                {opened && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'>
                    <div className='bg-white rounded shadow-md p-8 w-[80%] relative'>
                      <button onClick={handleClick} className="absolute top-5 right-5 text-black font-bold">X</button>
                      <iframe className='rounded-md w-full h-[80vh]' src={`https://www.youtube.com/embed/${linkTrailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                  </div>
                )}
                <Link to="/">
                  <button className="font-semibold text-xl text-white bg-red-500 rounded-xl px-3">Back</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
        </div>
        <div className="flex mx-3 pt-36 lg:px-32 flex-wrap flex-col lg:flex">
          <div className="w-full lg:w-5/6">
            <h1 className="font-bold text-3xl text-white">Overview</h1>
            <p className="text-white">{movie.overview}</p>
          </div>
          <div className="flex sm:flex-wrap lg:flex">
            <div>
              <h1 className="font-bold text-3xl text-white mt-10 mr-14">Popularity</h1>
              <p className="text-white text-lg font-semibold mt-3">{movie.popularity}</p>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-white mt-10 mr-14">Released Date</h1>
              <p className="text-white text-lg font-semibold mt-3">{movie.release_date}</p>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-white mt-10 mr-14">Revenue</h1>
              <p className="text-white text-lg font-semibold mt-3">${movie.revenue}</p>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-white mt-10 mr-14">Budget</h1>
              <p className="text-white text-lg font-semibold mt-3">${movie.budget}</p>
            </div>
            <div>
              <h1 className="font-bold text-3xl text-white mt-10">IMDB ID</h1>
              <p className="text-white text-lg font-semibold mt-3">{movie.imdb_id}</p>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-3xl mx-3 pt-28 lg:px-10 mb-5 text-white">Cast</h1>
        <Carousel className="mb-10" responsive={responsive} swipeable draggable infinite autoPlay autoPlaySpeed={4500} transitionDuration={500}>
          {cast.map((pemain) => (
            <div key={pemain.id}>
              <div className="w-[200px] mx-10">
                <img src={`https://image.tmdb.org/t/p/original${pemain.profile_path}`} className="rounded-xl" alt={pemain.name} />
                <p className="text-white text-lg font-semibold mt-3">{pemain.name}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <Footer />
      </div>
    </div>
  );
};

export default DetailMovie;
