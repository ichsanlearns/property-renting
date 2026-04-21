import LayoutFive from "./LayoutFive";

type PropertyImage = {
  imageUrl: string;
  isCover: boolean;
};

type Props = {
  images?: PropertyImage[];
};

export default function PropertyImageGallery({ images = [] }: Props) {
  const imgs = images.slice(0, 5);
  const count = imgs.length;

  const imgClass =
    "w-full h-full object-cover transition duration-500 hover:scale-105";

  if (count === 0) return <div>No images</div>;

  const layoutMap: Record<
    number,
    ({
      images,
      imgClass,
    }: {
      images: any[];
      imgClass: string;
    }) => React.ReactNode
  > = {
    5: LayoutFive,
  };

  const Layout = layoutMap[count];

  return <Layout images={imgs} imgClass={imgClass} />;
}
