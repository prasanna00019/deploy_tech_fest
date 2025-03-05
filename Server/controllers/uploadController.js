export const uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Construct the public URL
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  
      res.status(201).json({ message: "Image uploaded successfully!", fileUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  