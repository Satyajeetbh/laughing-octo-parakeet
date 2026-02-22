const pdfParse = require("pdf-parse")

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const data = await pdfParse(req.file.buffer)

    const text = data.text.replace(/\s+/g, " ").trim()

    const wordCount = text.split(" ").length
    const charCount = text.length

    return res.status(200).json({
      wordCount,
      charCount,
      extractedText: text
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error processing resume",
      error: error.message
    })
  }
}