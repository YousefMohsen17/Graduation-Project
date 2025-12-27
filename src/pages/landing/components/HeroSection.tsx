import ButtonLink from "../../../components/ButtonLink";
import illustration from "../../../assets/illustration.svg";
import star from "../../../assets/Soft Star.svg";
export default function HeroSection() {
  return (
    <section>
      <div className="container mx-auto p-4 flex flex-col-reverse lg:flex-row justify-between items-center mb-10 lg:mb-[100px] gap-10 lg:gap-0">
        <div className="flex flex-col gap-6 lg:gap-10 max-w-[617px] text-center lg:text-left items-center lg:items-start">
          <h1 className="text-3xl lg:text-[39px] font-semibold leading-tight">
            Study Smarter. Learn Faster. Stay Organized.
          </h1>
          <p className="text-[#141C52] text-lg">
            Engipedia brings all CCE courses, resources, and quizzes into one
            seamless experience.
          </p>
          <ButtonLink
            to="/"
            children="Begin Your Journey"
            variant="solid"
            className="py-2 px-5 h-[62px] w-fit"
          />
        </div>
        <img src={star} alt="star" className="self-end hidden lg:block" />
        <div className="w-full max-w-[500px] lg:max-w-none">
          <img src={illustration} alt="illustration image" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
