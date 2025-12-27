import studentStudying from "../../../assets/student-studying.svg";
import ButtonLink from "./../../../components/ButtonLink";
export default function CTASection() {
  return (
    <section>
      <div className="container mx-auto p-4">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-0">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-2xl lg:text-[31px] mb-4 lg:mb-8 font-bold">
              Start Your Learning Journey Today
            </h2>
            <p className="mb-6 lg:mb-10 text-sm lg:text-base">
              Join thousands of students developing their skills with our
              platform
            </p>
            <ButtonLink
              to="/sign-up"
              variant="solid"
              children="Join Our Community"
              className="h-[62px] py-2 px-5"
            />
          </div>
          <div>
            <img src={studentStudying} alt="student Studying illustration" className="w-full max-w-[300px] lg:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
