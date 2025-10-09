

const TrailerIframed = ({currentMovie, setShowTrailerModal}: any) => {

//  console.log(currentMovie.trailerKey)
  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center px-4">
      <div className="relative bg-black rounded-lg overflow-hidden w-full max-w-[1100px] aspect-video shadow-xl">

        <iframe className="w-full h-full"
          src={`https://www.youtube.com/embed/${currentMovie.trailerKey}?autoplay=1`}
          title="Trailer" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
        </iframe>

        <button onClick={() => setShowTrailerModal(false)}
          className="absolute top-[2px] right-[2px] text-white text-2xl bg-black border border-[#ffffff86] rounded-[3px] w-[45px] h-[45px] flex items-center justify-center cursor-pointer
          hover:text-3xl hover:bg-[#2c2c2c] hover:border-white max-md:w-[35px] max-md:h-[35px] transition1"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  )
}

export default TrailerIframed