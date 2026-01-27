import CourseBox from "./components/CourseBox";
import WelcomeMessage from "./components/WelcomeMessage";
export default function HomePage() {
    return (
        <div className="container mx-auto px-4">
            <WelcomeMessage />
            <CourseBox />
        </div>
    );
}
