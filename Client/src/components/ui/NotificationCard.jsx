import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function NotificationCard({ type, message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-3 z-50
            ${isSuccess ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
          style={{
            background: isSuccess
              ? "linear-gradient(45deg, #2dd4bf, #3b82f6)"
              : "linear-gradient(45deg, #ef4444, #f97316)",
            boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)",
          }}
        >
          {isSuccess ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
          <span className="font-semibold">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
