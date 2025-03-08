import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import spaceBg from "../../assets/images/space-bg.png";

const EventDetails = ({ event }) => {
  const navigate = useNavigate();

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-2xl">Event not found</h1>
      </div>
    );
  }  

  return (
    <div className="relative flex flex-col items-center min-h-screen px-6 py-10 text-white">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${spaceBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Event Content */}
      <div className="relative z-10 max-w-4xl w-full bg-black/30 backdrop-blur-sm rounded-xl p-8">
        {/* Event Title */}
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#e0aaf2] via-[#affbfe] to-[#f9effe] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {event.title}
        </motion.h1>

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20">
            <TabsTrigger value="details" className="text-white">Details</TabsTrigger>
            <TabsTrigger value="rules" className="text-white">Rules</TabsTrigger>
            <TabsTrigger value="contact" className="text-white">Contact</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full rounded-lg shadow-lg object-cover h-[300px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => (e.target.src = "https://cdn4.iconfinder.com/data/icons/ui-beast-3/32/ui-49-4096.png")}
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <motion.div className="mb-4 space-y-2">
                    <p className="text-purple-300">📅 {event.timeline}</p>
                    <p className="text-purple-300">📍 {event.venue}</p>
                    <p className="text-purple-300">👥 Team Size: {event.teamSize}</p>
                  </motion.div>

                  <motion.p className="text-lg text-gray-200">
                    {event.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-300 mb-2">Registration Details</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-200">
                <p>Deadline: {event.registrationDeadline}</p>
                <p>Fee: {event.fee}</p>
              </div>
            </motion.div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-6">
            <motion.div className="space-y-4">
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">Event Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-200">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </motion.div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-6">
            <motion.div className="space-y-6">
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">Contact Information</h3>
              <p className="text-gray-200">{event.coordinator}</p>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <motion.div className="flex flex-wrap justify-center gap-6 mt-8">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700" 
          onClick={() => window.location.href = `/event-registration/${event.id}`}
          >
            Register Now
          </Button>
          <Button
            variant="outline"
            className="text-gray-900 border-gray-300 hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
