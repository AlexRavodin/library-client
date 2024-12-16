import React from 'react';
import {Button} from "@/components/ui/button";
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import {Link} from "react-router-dom";

const ContactPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Contact Us
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Get in touch with the developer behind the Library App.
                        </p>
                    </div>
                </div>
            </section>

            {/* Developer Information */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <img
                            src="https://avatars.githubusercontent.com/u/91945858?v=4"
                            alt="Alex Ravodin"
                            className="w-32 h-32 rounded-full"
                        />
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Alex Ravodin
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-600 md:text-lg">
                                Passionate developer with a focus on creating innovative and user-friendly applications.
                                Experienced in full-stack development and always eager to learn new technologies.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <Button variant="outline" asChild>
                                <Link to="https://github.com/AlexRavodin" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="mr-2"/>
                                    GitHub
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link to="www.linkedin.com/in/alex-ravodin" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="mr-2"/>
                                    LinkedIn
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
