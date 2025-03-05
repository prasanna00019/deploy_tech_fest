import { Rocket, Users, Mail, Phone, MapPin } from "lucide-react"
import TeamCarousel from "../components/ui/TeamCarousel"
export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="relative h-64 overflow-auto">
                <img
                    src="/IITRAM.png"
                    alt="Space themed header"
                    width={1600}
                    height={400}
                    className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold">TechFest 2025: Cosmic Innovations</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* College Information */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4 flex items-center">
                        <Rocket className="mr-2" /> About Our College
                    </h2>
                    <p className="text-gray-300">
                        Welcome to IITRAM, where we push the boundaries of innovation and explore the
                        frontiers of science. Our annual TechFest brings together the brightest minds to showcase cutting-edge
                        projects and ideas that are out of this world!
                    </p>
                </section>

                {/* Event Team */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4 flex items-center">
                        <Users className="mr-2" /> Our Event Team
                    </h2>
                    <div className="max-w-6xl mx-auto">
                        <TeamCarousel />
                    </div>
                </section>

                {/* Contact Details and Map */}
                <section className="grid md:grid-cols-2 gap-8">
                    {/* Contact Details */}
                    <div>
                        <h2 className="text-3xl font-semibold mb-4 flex items-center">
                            <Mail className="mr-2" /> Contact Us
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Phone className="mr-2" />
                                <span>+1 (123) 456-7890</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-2" />
                                <span>contact@iitram.edu</span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="mr-2" />
                                <span>Institute of Infrastructure, Technology, Research, and Management (IITRAM), Ahmedabad, India</span>
                            </div>
                        </div>
                    </div>
                    {/* Map */}
                    <div>
                        <h2 className="text-3xl font-semibold mb-4 flex items-center">
                            <MapPin className="mr-2" /> Find Us
                        </h2>
                        <div className="bg-gray-800 h-64 rounded-lg mb-4 flex items-center justify-center">
                            <iframe
                                className="shadow-lg rounded-lg w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.534992100846!2d72.61905467492468!3d23.00412097918668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e86754818a631%3A0xba553baa74c5e165!2sInstitute%20of%20Infrastructure%2C%20Technology%2C%20Research%20and%20Management(IITRAM)!5e0!3m2!1sen!2sin!4v1728756250893!5m2!1sen!2sin"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
