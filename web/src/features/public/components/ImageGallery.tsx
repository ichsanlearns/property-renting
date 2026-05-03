import { useEffect, useState } from "react";

type ImageGalleryProps = {
  imageUrl: string;
};

function ImageGallery({
  images,
  title,
  location,
  setShowImageGallery,
}: {
  images: ImageGalleryProps[];
  title: string;
  location: string;
  setShowImageGallery: (value: boolean) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleNextImage = () => {
    if (currentImageIndex === images.length - 1) {
      return;
    }
    setCurrentImageIndex((prev) => prev + 1);
  };

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      return;
    }
    setCurrentImageIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
      }

      if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? prev : prev + 1,
        );
      }

      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev === 0 ? prev : prev - 1));
      }

      if (e.key === "Escape") {
        setShowImageGallery(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, setShowImageGallery]);

  return (
    <div className="fixed inset-0 p-20 z-9000 bg-black/40  text-white w-screen h-screen overflow-hidden font-body selection:bg-primary selection:text-white">
      <div className="absolute inset-0 w-full h-full z-0 p-2 md:p-4">
        <div className="w-full h-full rounded-2xl md:rounded-4xl overflow-hidden relative md:p-20 ">
          <img
            alt="Luxurious oceanfront bedroom with panoramic floor-to-ceiling windows"
            className="w-full h-full object-cover md:rounded-4xl"
            data-alt="Wide shot of an ultra-modern luxury bedroom overlooking the ocean at sunset with warm glowing light"
            src={images[currentImageIndex].imageUrl}
          />
        </div>
      </div>
      <div className="absolute top-0 inset-x-0 h-40 gradient-top z-10 pointer-events-none rounded-t-2xl md:rounded-t-4xl mx-2 md:mx-4 mt-2 md:mt-4"></div>
      <header className="absolute top-8 md:top-10 inset-x-8 md:inset-x-12 z-20 flex justify-between items-center w-auto">
        <div className="text-white/90 text-xs md:text-sm font-medium tracking-widest drop-shadow-sm bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
          {currentImageIndex + 1} / {images.length}
        </div>
        <div className="flex items-center gap-3 ">
          <button
            onClick={() => setShowImageGallery(false)}
            aria-label="close gallery"
            className="bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-white/10 text-white/90 hover:text-white transition-all active:scale-95 duration-200 p-2.5 rounded-full shadow-lg cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[20px] "
              data-icon="close"
            >
              close
            </span>
          </button>
        </div>
      </header>
      <div className="absolute bottom-40 md:bottom-44 left-8 md:left-12 z-20 pointer-events-none drop-shadow-md">
        <h1 className="text-white/90 font-headline text-2xl md:text-3xl font-medium tracking-tight">
          {title}
        </h1>
        <p className="text-white/60 text-sm mt-1">{location}</p>
      </div>
      <button
        onClick={handlePrevImage}
        aria-label="Previous image"
        className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xl text-white/90 hover:text-white transition-all hover:scale-105 hover:brightness-110 shadow-lg border border-white/10 group mt-8 lg:mt-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={currentImageIndex === 0}
      >
        <span
          className="material-symbols-outlined text-3xl group-hover:-translate-x-0.5 transition-transform"
          data-icon="chevron_left"
        >
          chevron_left
        </span>
      </button>
      <button
        onClick={handleNextImage}
        aria-label="Next image"
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xl text-white/90 hover:text-white transition-all hover:scale-105 hover:brightness-110 shadow-lg border border-white/10 group mt-8 lg:mt-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={currentImageIndex === images.length - 1}
      >
        <span
          className="material-symbols-outlined text-3xl group-hover:translate-x-0.5 transition-transform"
          data-icon="chevron_right"
        >
          chevron_right
        </span>
      </button>
      <div className="absolute bottom-0 inset-x-0 h-64 gradient-bottom z-10 pointer-events-none rounded-b-2xl md:rounded-b-4xl mx-2 md:mx-4 mb-2 md:mb-4"></div>
      <footer className="absolute bottom-8 md:bottom-10 w-full flex items-end justify-center px-4 z-30">
        <div className="bg-black/30 backdrop-blur-2xl p-3 md:p-4 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x max-w-[90vw] md:max-w-3xl items-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="shrink-0 snap-center w-[100px] h-[70px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border-2 border-white/10 scale-105 shadow-xl relative transition-all z-10 cursor-pointer hover:scale-105 hover:brightness-110 hover:shadow-lg hover:border-white hover:transition-all hover:duration-200 hover:ease-in-out"
              >
                <img
                  className="w-full h-full object-cover"
                  data-alt="Thumbnail of modern master bedroom with ocean view"
                  src={image.imageUrl}
                />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ImageGallery;
