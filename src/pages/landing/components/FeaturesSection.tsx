import student from "../../../assets/student.svg";
import progress from "../../../assets/progress.svg";
import community from "../../../assets/community.svg";
import content from "../../../assets/content.svg";
export default function FeaturesSection() {
  return (
    <section className="mb-16 lg:mb-[100px]">
      <div className="text-center mb-10 lg:mb-20 px-4">
        <h2 className="text-2xl lg:text-[31px] font-bold mb-4 lg:mb-8">Why Choose Our Platform?</h2>
        <p className="text-[#141C52] max-w-[748px] mx-auto text-sm lg:text-base">
          We offer a simple, organized, and engaging learning experiencedesigned
          to help you grow step by step without feeling overwhelmed.
        </p>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[60px] justify-items-center">
        <div className="py-5 px-2.5 flex flex-col items-center gap-2 rounded-2xl bg-[#EAEDFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[340px] w-full">
          <img src={student} alt="student logo" className="w-[65px] h-14" />
          <h3 className="font-bold text-center text-lg lg:text-xl"> Clear Learning Paths</h3>
          <p className="text-[#141C52] text-center text-sm lg:text-base">
            Structured and progressive courses that match your level and guide
            you from start to finish
          </p>
        </div>
        <div className="py-5 px-2.5 flex flex-col items-center gap-2 rounded-2xl bg-[#EAEDFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[340px] w-full">
          <img src={community} alt="student logo" className="w-[65px] h-14" />
          <h3 className="font-bold text-center text-lg lg:text-xl"> Supportive Community</h3>
          <p className="text-[#141C52] text-center text-sm lg:text-base">
            Join learners just like you ask questions, share achievements, and
            learn together.
          </p>
        </div>
        <div className="py-5 px-2.5 flex flex-col items-center gap-2 rounded-2xl bg-[#EAEDFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[340px] w-full">
          <img src={progress} alt="student logo" className="w-[65px] h-14" />
          <h3 className="font-bold text-center text-lg lg:text-xl"> Track Your Progress</h3>
          <p className="text-[#141C52] text-center text-sm lg:text-base">
            Monitor your improvement, earn badges, and stay motivated throughout
            your learning journey.
          </p>
        </div>
        <div className="py-5 px-2.5 flex flex-col items-center gap-2 rounded-2xl bg-[#EAEDFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[340px] w-full">
          <img src={content} alt="student logo" className="w-[65px] h-14" />
          <h3 className="font-bold text-center text-lg lg:text-xl"> Interactive Content</h3>
          <p className="text-[#141C52] text-center text-sm lg:text-base">
            Videos, exercises, and hands-on activities that help you apply what
            you learn instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
