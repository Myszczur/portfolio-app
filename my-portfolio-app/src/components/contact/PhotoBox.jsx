const PhotoBox = ({ className }) => {
  return (
    <div
      className={`${className} p-6 bg-black/50 border-3 border-green-500/30 rounded-lg
        backdrop-blur-sm shadow-lg shadow-green-500/10 flex flex-col items-center justify-center`}
    >
      <img
        src="https://placehold.co/150x150"
        alt="my-photo"
        className="rounded-full w-100 h-150 sm:w-80 sm:h-100 border-2 border-green-400 object-cover shadow-lg shadow-green-500/20"
      />
      <p className="mt-4 text-green-300 text-lg tracking-widest">
        Kamil Urbanik
      </p>
      <p className="text-green-400/70 text-sm text-center">
        Full Stack Developer <br /> Java & React
      </p>
    </div>
  );
};

export default PhotoBox;