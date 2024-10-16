import BigFireworksWidget from "@/components/widget/BigFireworks";
import FireworksWidget from "@/components/widget/Fireworks";
import MusicPlayer from "@/components/widget/MusicPlayer";
import WishFormAction from "@/components/widget/WishFormAction";
import MessagePannel from "@/components/widget/MessagePannel";
import ContentPage from "@/components/Pages/ContentPage";

export default function Home() {
  return (
    <>
      <div className="h-screen max-h-[932px] relative overflow-auto pb-[64px]">
        <ContentPage />

        <MusicPlayer className="absolute top-3 right-3 z-[99]" />
        <div className="absolute bottom-[64px] left-0 w-full z-[99999]">
          <MessagePannel />
        </div>
        <div className="absolute bottom-0 left-0 w-full z-[99999]">
          <div className="flex justify-between items-center px-4 py-2">
            <WishFormAction />
            <FireworksWidget />
            <BigFireworksWidget />
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <a
            href="tel:17354001840"
            className="text-blue-600 hover:underline mt-12"
          >
            韩金泽
          </a> */
}
