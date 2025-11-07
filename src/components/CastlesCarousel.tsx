import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useCastle } from "../contexts/CastleContext";
import CarouselCard from "./CarouselCard";
import { useRef } from "react";

const CastlesCarousel = () => {
  const { castles } = useCastle();
  const nordicRef = useRef<HTMLDivElement | null>(null);
  const swedenRef = useRef<HTMLDivElement | null>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth"
      });
    } 
  }

  return (
    <div className="space-y-6 page-margin">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="h3">Nordic</h3>
          <div className="flex gap-4">
            <TfiArrowCircleLeft onClick={() => scroll(nordicRef, -200)} className="w-6 h-6 fill-primary cursor-pointer" />
            <TfiArrowCircleRight onClick={() => scroll(nordicRef ,200)} className="w-6 h-6 fill-primary cursor-pointer" />
          </div>
        </div>
        <div ref={nordicRef} className="flex overflow-x-auto overflow-y-visible gap-4 pb-3 hidden-scrollbar">
          {castles.map(castle => (
            <CarouselCard castle={castle} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="h3">Sweden</h3>
          <div className="flex gap-4">
            <TfiArrowCircleLeft onClick={() => scroll(swedenRef, -200)} className="w-6 h-6 fill-primary cursor-pointer" />
            <TfiArrowCircleRight onClick={() => scroll(swedenRef, 200)} className="w-6 h-6 fill-primary cursor-pointer" />
          </div>
        </div>
        <div ref={swedenRef} className="flex overflow-x-auto overflow-y-visible gap-4 pb-3 hidden-scrollbar">
          {castles
            .filter(castle => castle.country === "Sweden")
            .map(castle => (
              <CarouselCard castle={castle} />
            ))
          }
        </div>
      </div>

    </div>
  )
}
export default CastlesCarousel