import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function TechSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center h-screen w-screen bg-black/50 backdrop-blur-sm z-50">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            background:
              "linear-gradient(90deg, transparent, transparent 50%, rgba(56, 189, 248, 0.8) 75%, rgba(139, 92, 246, 0.8))",
            backgroundSize: "400% 100%",
            boxShadow: "0 0 15px 2px rgba(56, 189, 248, 0.3)",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 0%"], rotate: 360 }}
          transition={{
            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Rocket moving up & down */}
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Rocket className="w-10 h-10 text-sky-400" />
        </motion.div>
      </div>
    </div>
  );
}
