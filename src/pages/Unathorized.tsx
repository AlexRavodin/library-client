import React from 'react';

const Unauthorized: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Unauthorized
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            You don't have access to this page.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Unauthorized;