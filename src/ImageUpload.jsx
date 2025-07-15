import React, { useState } from "react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

function ImageUpload({ theme }) {
  const [images, setImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const sorted = files.sort((a, b) => a.lastModified - b.lastModified);
    setImages((prev) => [...prev, ...sorted]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const sorted = files.sort((a, b) => a.lastModified - b.lastModified);
    setImages((prev) => [...prev, ...sorted]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const deleteImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    const doc = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const imgData = await toBase64(images[i]);
      const img = new Image();
      img.src = imgData;
      await new Promise((res) => (img.onload = res));

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      if (i !== 0) doc.addPage();
      doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
    }

    doc.save("images.pdf");
    setIsGenerating(false);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const cardStyle = {
    backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
    color: theme === "dark" ? "#F0F0F0" : "#1A1A1A",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    width: "90%",
    maxWidth: "850px",
    margin: "30px auto",
    padding: "30px",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={cardStyle}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        📤 Upload or Drag & Drop Images
      </h2>

      {/* Fancy File Upload Box */}
      <label htmlFor="fileUpload">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: theme === "dark"
              ? "linear-gradient(135deg, #292929, #1e1e1e)"
              : "linear-gradient(135deg, #f5f5f5, #e9e9e9)",
            border: theme === "dark" ? "2px dashed #555" : "2px dashed #999",
            padding: "2.5rem",
            borderRadius: "18px",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "2rem",
            fontWeight: "600",
            fontSize: "1.2rem",
            color: theme === "dark" ? "#ffffffcc" : "#222",
            boxShadow: theme === "dark"
              ? "0 8px 20px rgba(0, 255, 255, 0.1)"
              : "0 8px 20px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          📁 Click or Drag Files Here
          <input
            type="file"
            id="fileUpload"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </motion.div>
      </label>

      {/* Thumbnails */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginTop: "10px",
        }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            style={{ position: "relative" }}
          >
            <img
              src={URL.createObjectURL(img)}
              alt={`upload-${idx}`}
              width="120"
              height="120"
              style={{ objectFit: "cover", borderRadius: "12px" }}
            />
            <button
              onClick={() => deleteImage(idx)}
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                backgroundColor: "#FF5252",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                width: "22px",
                height: "22px",
              }}
            >
              ×
            </button>
          </motion.div>
        ))}
      </div>

      {/* Generate Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePDF}
          disabled={isGenerating}
          style={{
            padding: "14px 34px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: theme === "dark" ? "#4CAF50" : "#2E7D32",
            color: "white",
            cursor: isGenerating ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
            boxShadow: theme === "dark"
              ? "0 6px 20px rgba(76, 175, 80, 0.3)"
              : "0 6px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          {isGenerating ? "📄 Generating..." : "📄 Download PDF"}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ImageUpload;
