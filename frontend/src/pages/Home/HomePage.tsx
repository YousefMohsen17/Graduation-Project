import CourseBox from "./components/CourseBox";
import WelcomeMessage from "./components/WelcomeMessage";
import AboutSection from "./components/AboutSection"
export default function HomePage() {
    return (
        <div className="container mx-auto px-4">
            <WelcomeMessage />
            <CourseBox />
            <AboutSection />
        </div>
    );
}
