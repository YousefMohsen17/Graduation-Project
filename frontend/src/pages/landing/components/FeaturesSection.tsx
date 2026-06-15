import { Waypoints,Activity, ChartColumnDecreasing , Users ,Brain  } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="mb-16 lg:mb-[100px]">
      <div className="text-center mb-10 lg:mb-20 px-4">
        <h2 className="text-2xl lg:text-[31px] font-bold mb-4 lg:mb-8">Why Choose Our Platform?</h2>
        <p className="text-[#141C52] max-w-[748px] mx-auto text-base lg:text-lg text-[#141C52]">
          We offer a simple, organized, and engaging learning experiencedesigned
          to help you grow step by step without feeling overwhelmed.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 grid-rows-2 gap-4  md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[10px] justify-items-center">
        <div className="group row-span-2 py-5 px-2.5 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[584px] w-full hover:from-[#8490E1] hover:to-[#FAFAFA] md:row-span-1 lg:row-span-2">
          <div className="img-box flex items-center justify-center w-14 h-14 bg-[#D6DAF5] z-10 rounded-2xl group-hover:rotate-30 group-hover:bg-[#1349EC]" ><Waypoints className='stroke-[#1349EC] group-hover:stroke-[#FAFAFA]' /></div>
          <div className="content mt-6 ml-3">
          <h3 className="font-bold text-lift text-lg lg:text-2xl"> Clear Learning Paths</h3>
          <p className="text-[#141C52] text-lift text-base lg:text-lg mt-2 text-[#141C52]">
           Structured curriculumroadmaps designed specifically for CCE specializations. Navigate your academic journey with precision.
          </p>
          </div>
        </div>
        <div className="group col-span-2 py-5 px-2.5 flex  items-center justify-between gap-6 rounded-2xl bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[584px] w-full hover:from-[#8490E1] hover:to-[#FAFAFA] md:col-span-1 lg:col-span-2">
          <div className="img-box ml-10 flex items-center justify-center w-18 h-20 bg-[#D6DAF5] z-10 rounded-2xl group-hover:rotate-30 group-hover:bg-[#1349EC]" ><Users className='stroke-[#1349EC] group-hover:stroke-[#FAFAFA]' /></div>


          <div className="content max-w-[70%]">
          <h3 className="font-bold text-lift text-lg lg:text-2xl"> Supportive Community</h3>
          <p className="text-[#141C52] text-lift text-base lg:text-lg text-[#141C52]">
            Connect with peers and seniors to share insights, academic
            resources, and career advice.
          </p>
          </div>
        </div>
        <div className="group py-5 px-2.5 flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[584px] w-full hover:from-[#8490E1] hover:to-[#FAFAFA]">
          <div className="img-box flex items-center justify-center w-14 h-14 bg-[#D6DAF5] z-10 rounded-2xl group-hover:rotate-30 group-hover:bg-[#1349EC]" ><ChartColumnDecreasing className='stroke-[#1349EC] group-hover:stroke-[#FAFAFA]'/></div>
         <div className="content">
          <h3 className="font-bold text-center text-lg lg:text-2xl"> Track Your Progress</h3>
          <p className="text-[#141C52] text-center text-base lg:text-lg text-[#141C52]">
            Stay on top of your semester goals effortlessly and stay organized.
          </p>
          </div>
        </div>
        <div className="group col-span-2  py-5 px-2.5 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[584px] w-full hover:from-[#8490E1] hover:to-[#FAFAFA] md:col-span-1 lg:col-span-2">
          
          <div className="content max-w-[70%] ml-3">
          <h3 className="font-bold text-lift text-lg lg:text-2xl"> Interactive Content & Simulations</h3>
          <p className="text-[#141C52] text-lift text-base lg:text-lg text-[#141C52]">
            Engage with dynamic simulations and hands-on coding
            exercises built for future engineers.
          </p>
          </div>
          <div className="img-box mr-10 flex items-center justify-center w-18 h-20 bg-[#D6DAF5] z-10 rounded-2xl group-hover:rotate-30 group-hover:bg-[#1349EC]" ><Activity className="stroke-[#1349EC] group-hover:stroke-[#FAFAFA]" /></div>
        </div>
        
        <div className="group py-5 px-2.5 flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] shadow-[0px_34px_34px_0px_rgba(0,0,0,0.09),0px_78px_47px_0px_rgba(0,0,0,0.05),0px_138px_55px_0px_rgba(0,0,0,0.01),0px_215px_60px_0px_rgba(0,0,0,0)] max-w-[584px] w-full hover:from-[#8490E1] hover:to-[#FAFAFA] ">
          <div className="img-box flex items-center justify-center w-14 h-14 bg-[#D6DAF5] z-10 rounded-2xl group-hover:rotate-30 group-hover:bg-[#1349EC]" ><Brain className='stroke-[#1349EC] group-hover:stroke-[#FAFAFA]' /></div>
          <div className="content">
          <h3 className="font-bold text-center text-lg lg:text-2xl"> AI Assistant</h3>
          <p className="text-[#141C52] text-center text-base lg:text-lg text-[#141C52]">
            Get instant help with your studies and build your CV with ease.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
