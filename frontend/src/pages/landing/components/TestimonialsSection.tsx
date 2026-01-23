import Carousel from "../../../components/Carousel";

export default function TestimonialsSection() {
  return (
    <section className="mb-16 lg:mb-[100px]">
      <div className="text-center mb-10 lg:mb-20 px-4">
        <h2 className="text-2xl lg:text-[31px] font-bold mb-4 lg:mb-8">Hear From Our Learners</h2>
        <p className="text-[#141C52] max-w-[748px] mx-auto text-sm lg:text-base">
          Real experiences from real students who’ve grown their skills and
          advanced their careers with us.
        </p>
      </div>
      <Carousel />
    </section>
  );
}
