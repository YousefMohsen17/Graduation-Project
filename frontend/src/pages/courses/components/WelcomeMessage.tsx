import { GraduationCap } from 'lucide-react';

export default function WelcomeMessage() { 
    return (
<div className="p-4 ml-15 ms:ml-0 ms:p-0">
  <div className="flex items-start gap-3 mb-2">
    <GraduationCap className="mb-4" size={25} color="#1349EC" />
    <div>
    <p className="text-[22px] font-bold
     text-[#141C52]">Academic Excellence</p>
    </div>
  </div>
  <p className="text-black-600 text-sm ">
    <h2 className="text-lg font-bold ">Explore Your Courses</h2>
    <p className="text-lg text-[#141C52]">Continue your journey through our curated collection of advanced linguistic
    studies and technical literature.</p>
  </p>
</div>
  );
}
