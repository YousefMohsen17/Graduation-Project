const LoadingPage = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="relative flex items-center justify-center">
                {/* Main outer ring */}
                <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

                {/* Inner ring spinning opposite direction */}
                <div className="absolute w-16 h-16 border-4 border-purple-100 border-b-purple-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />

                {/* Smallest inner dot */}
                <div className="absolute w-8 h-8 bg-blue-600 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 animate-pulse tracking-tight">
                    Engipedia
                </h2>
                <div className="mt-4 flex items-center justify-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                </div>
                <p className="text-gray-400 mt-4 text-xs font-semibold tracking-[0.2em] uppercase">
                    Optimizing your experience...
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
