import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  DecorativeQuoteMark,
  DecorativeStarMark,
} from "./DecorativeQuoteMark.jsx";

// Use EmblaOptionsType for options

type PropType = {
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { options: propOptions } = props;
  const emblaOptions: EmblaOptionsType = propOptions || {
    align: "center",
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(1); // Scroll to the second slide on load
    }
  }, [emblaApi]);

  return (
    <section className="embla text-[#EAEDFA]">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <div className="bg-linear-to-t from-[#0A0E29] to-[#1E2A7B] rounded-3xl p-5 ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-3 mb-3.5">
                    <img
                      src="/src/assets/userimages/omar.png"
                      alt="user-image"
                      className="w-14 h-14 rounded-4xl"
                    />
                    <div>
                      <h4 className="font-bold text-xl mb-1">Omar Ahmed</h4>
                      <p>Graphic Designer</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3.5 items-center">
                    <div className="flex gap-0.5">
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-[25px]">5.0</h3>
                  </div>
                </div>
                <DecorativeQuoteMark className="pointer-events-none h-36 w-36 " />
              </div>

              <p>
                "I've tried many platforms before, but this one really stands
                out. Support is quick, and the courses are structured
                professionally. It's a great place to learn and grow."
              </p>
            </div>
          </div>
          <div className="embla__slide">
            <div className="bg-linear-to-t from-[#0A0E29] to-[#1E2A7B] rounded-3xl p-5 ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-3 mb-3.5">
                    <img
                      src="/src/assets/userimages/fazwi.png"
                      alt="user-image"
                      className="w-14 h-14 rounded-4xl"
                    />
                    <div>
                      <h4 className="font-bold text-xl mb-1">Fawzi Sayed</h4>
                      <p>Engineering Student</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3.5 items-center">
                    <div className="flex gap-0.5">
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-[25px]">5.0</h3>
                  </div>
                </div>
                <DecorativeQuoteMark className="pointer-events-none h-36 w-36 " />
              </div>

              <p>
                "This platform is amazing! The courses are well-organized and
                easy to follow. I felt like I was learning fast without any
                pressure. I highly recommend it to anyone looking to improve
                their skills."
              </p>
            </div>
          </div>
          <div className="embla__slide">
            <div className="bg-linear-to-t from-[#0A0E29] to-[#1E2A7B] rounded-3xl p-5 ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-3 mb-3.5">
                    <img
                      src="/src/assets/userimages/sara.png"
                      alt="user-image"
                      className="w-14 h-14 rounded-4xl"
                    />
                    <div>
                      <h4 className="font-bold text-xl mb-1">Sara Samy</h4>
                      <p>Ui Ux Designer</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3.5 items-center">
                    <div className="flex gap-0.5">
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                      <DecorativeStarMark className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-[25px]">5.0</h3>
                  </div>
                </div>
                <DecorativeQuoteMark className="pointer-events-none h-36 w-36 " />
              </div>

              <p>
                "The courses here are not just theoretical, they include real
                practical applications that helped me apply what I learned to my
                work. Truly an exceptional learning experience!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
