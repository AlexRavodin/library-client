import React from 'react';
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            About Our Library App
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Discover the features and vision behind our innovative library management system.
                        </p>
                    </div>
                </div>
            </section>

            {/* Project Description */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                        Project Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">Features</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Browse and view available books</li>
                                <li>Borrow books for later pickup</li>
                                <li>Advanced filtering and searching capabilities</li>
                                <li>User authentication and authorization</li>
                                <li>Multiple user roles: Customers, Managers, and Admins</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">User Roles</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Unauthorized users: Limited access to public information</li>
                                <li>Customers: Can browse, borrow, and manage their account</li>
                                <li>Managers: Additional privileges for book management</li>
                                <li>Admins: Full system control and user management</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Ready to Explore?
                        </h2>
                        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                            Start your reading journey with our extensive collection of books.
                        </p>
                        <div className="flex space-x-4">
                            <Button size="lg" asChild>
                                <Link to="/books">Browse Our Catalog</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;