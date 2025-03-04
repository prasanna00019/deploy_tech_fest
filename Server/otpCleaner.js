import db from "./db.js";
import cron from "node-cron";

const deleteExpiredOtps = () => {
    const deleteExpiredOtpQuery = "DELETE FROM otp_store WHERE created_at < NOW() - INTERVAL 5 MINUTE";
    db.query(deleteExpiredOtpQuery, (err, result) => {
      if (err) {
        console.log("Error deleting expired OTPs:", err);
      } else {
        console.log("Expired OTPs cleaned up");
  
        // Check if there are any remaining expired OTPs
        const checkRemainingOtpsQuery = "SELECT COUNT(*) AS count FROM otp_store WHERE created_at < NOW() - INTERVAL 5 MINUTE";
        db.query(checkRemainingOtpsQuery, (err, result) => {
          if (err) {
            console.log("Error checking remaining expired OTPs:", err);
          } else {
            const remainingOtpsCount = result[0].count;
            if (remainingOtpsCount === 0) {
              console.log("No expired OTPs remaining, stopping cron job");
              return; // Stop the cron job
            }
          }
        });
      }
    });
  };
  
  // Initial call to start the cron job
  deleteExpiredOtps();
  
  // Schedule task to run every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    deleteExpiredOtps();
  });

  export default deleteExpiredOtps;