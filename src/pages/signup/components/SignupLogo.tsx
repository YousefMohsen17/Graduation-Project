import cubesImage from "../../../assets/cubes.jpg";
export default function SignupLogo() {
    return (
        <div className="hidden lg:block lg:basis-[40%]">
            <img
                src={cubesImage}
                alt="cubes image"
                className="h-full object-cover w-full"
            />
        </div>
    );
}