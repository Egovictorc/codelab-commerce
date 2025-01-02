import { Download } from "lucide-react";

const Loading = () => {
  return (
    <div className="mx-auto flex justify-center flex-col items-center">
      <div className="animate-bounce  w-12 h12">
        <Download />
      </div>
      <p className="text-xl md:text-4xl">Loading...</p>
    </div>
  );
};

export default Loading;
