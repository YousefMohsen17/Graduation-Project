import { useAuth } from "../../../lib/queries";

export default function WelcomeMessage() {
  const { data: user } = useAuth();
  return (
    <div>
      <div className="flex flex-col justify-between items-center mb-10 lg:mb-20 md:flex-row max-[480px]:justify-center">
        <div>
          <h2>Welcome {user?.data?.name}</h2>
          <h4>Choose a course and complete your learning path</h4>
        </div>
      </div>
    </div>
  );
}
