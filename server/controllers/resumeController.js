const pdfParse = require("pdf-parse")
const parseSections = require("../utils/sectionParser")
const extractSkills = require("../utils/skillExtractor")
const detectQuantification = require("../utils/quantificationDetector");
const Resume = require("../models/Resume");


exports.uploadResume = async (req, res) => {
    console.log("Received resume upload request")
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const data = await pdfParse(req.file.buffer)

    const text = data.text.replace(/\s+/g, " ").trim()

    const sections = parseSections(text)

    const skills = extractSkills(sections.skills)
    const quantification = detectQuantification(sections.experience);
    console.log(sections.experience)
    

    const wordCount = text.split(" ").length
    const charCount = text.length
   const savedResume = await Resume.create({
  user: req.user.id,
  wordCount,
  charCount,
  skills,
  quantification,
  sections,
});

return res.status(200).json(savedResume);
    
  } catch (error) {
    return res.status(500).json({
      message: "Error processing resume",
      error: error.message
    })
  }
  
}


