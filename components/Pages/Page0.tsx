import DynamicBgLayout from "@/components/Layout/DynamicBgLayout";
import Image from "next/image";

export default function Page0() {
  return (
    <DynamicBgLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden p-6 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            我们结婚啦
          </h1>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/picture/1.png"
              alt="Wedding photo"
              width={1200}
              height={800}
              layout="responsive"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-center mt-6 text-gray-600 italic">
            &quot;爱共赴山河，共赴星辰大海&quot;
          </p>
        </div>
      </div>
    </DynamicBgLayout>
  );
}
