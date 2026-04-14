import * as LottieModule from "lottie-react";
import loaderAnimation from "../../../assets/loading.json";

function LoaderFullPage() {
  const Lottie = (LottieModule as any).default.default;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <Lottie animationData={loaderAnimation} loop={true} className="w-40" />

      <p className="mt-4 text-gray-500">
        Searching the best properties for you...
      </p>
    </div>
  );
}

export default LoaderFullPage;
