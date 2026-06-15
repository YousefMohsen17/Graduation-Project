export  function ProgressBar({ progress = 50 }) {
  return (
    <div className="w-full rounded-[5px] bg-gradient-to-t from-[#D6DAF5] to-[#FFFFFF] py-[16px] px-[20px] border border-white gap-2 drop-shadow-xl">
      <div className=" mb-1 text-sm">
        <p className="mb-2">Progress</p>
        <div className="flex justify-between flex-row">
        <span>${progress}% to copmelete</span>
        <span>{progress}min</span>
        </div>
      </div>

      <div className="w-full bg-[#EDF2F7] rounded-full h-3">
        <div
          className="bg-[#10B981] h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`}}
        ></div>
      </div>
    </div>
  );
}



export  default function ProgressBarCard({ progresscard = 50 }) {
  return (
    <div className="w-full rounded-[5px] bg-[#EDF2F7]">
        <div
          className="bg-[#10B981] h-3 rounded-full transition-all duration-500 "
          style={{ width: `${progresscard}%`}}
        ></div>
      </div>
    
  );
}

