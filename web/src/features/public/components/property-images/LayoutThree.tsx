function LayoutThree({ images, imgClass }: any) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-125 mb-12 rounded-2xl overflow-hidden group">
      <div className="md:col-span-2 md:row-span-2 overflow-hidden">
        <img src={images[0].imageUrl} className={imgClass} />
      </div>

      {images.slice(1).map((img: any, i: number) => (
        <div key={i} className="md:col-span-2 overflow-hidden">
          <img src={img.imageUrl} className={imgClass} />
        </div>
      ))}
    </section>
  );
}

export default LayoutThree;
