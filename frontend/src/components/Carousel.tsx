import React from "react";
import { CircleUserRound, Quote, Star } from "lucide-react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

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
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <div className="bg-[#ADB5EB] rounded-3xl p-5 ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-3 mb-3.5">
                    <CircleUserRound className="size-14" />
                    <div>
                      <h4 className="font-bold text-xl mb-1">Fawzi Sayed</h4>
                      <p>Engineering Student</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3.5 items-center">
                    <div className="flex gap-0.5">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <h3 className="font-bold text-[25px]">5.0</h3>
                  </div>
                </div>
                <Quote className="size-32 text-[#8490E1]" />
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
            <div className="bg-[#ADB5EB] rounded-3xl p-5 ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-3 mb-3.5">
                    <CircleUserRound className="size-14" />
                    <div>
                      <h4 className="font-bold text-xl mb-1">Fawzi Sayed</h4>
                      <p>Engineering Student</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3.5 items-center">
                    <div className="flex gap-0.5">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <h3 className="font-bold text-[25px]">5.0</h3>
                  </div>
                </div>
                <Quote className="size-32 text-[#8490E1]" />
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
            <div className="bg-[#ADB5EB] rounded-3xl p-5 ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-3 mb-3.5">
                    <CircleUserRound className="size-14" />
                    <div>
                      <h4 className="font-bold text-xl mb-1">Fawzi Sayed</h4>
                      <p>Engineering Student</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-3.5 items-center">
                    <div className="flex gap-0.5">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <h3 className="font-bold text-[25px]">5.0</h3>
                  </div>
                </div>
                <Quote className="size-32 text-[#8490E1]" />
              </div>

              <p>
                "This platform is amazing! The courses are well-organized and
                easy to follow. I felt like I was learning fast without any
                pressure. I highly recommend it to anyone looking to improve
                their skills."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
