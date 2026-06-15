import Header from "../pages/landing/components/Header";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <main className="bg-[#D6DAF5] pt-10 pb-10 lg:pt-[70px] lg:pb-[124px] relative overflow-hidden min-h-screen">
                <Header />
                <Outlet />
            </main>
        </>
    )
}   