const Profile = require("../models/Profile");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { branch, cgpa, skills, resumeLink } = req.body;

    const existingProfile = await Profile.findOne({ user: req.user._id });

    if (existingProfile) {
      existingProfile.branch = branch;
      existingProfile.cgpa = cgpa;
      existingProfile.skills = skills;
      existingProfile.resumeLink = resumeLink;

      await existingProfile.save();
      return res.json(existingProfile);
    }

    const profile = await Profile.create({
      user: req.user._id,
      branch,
      cgpa,
      skills,
      resumeLink
    });

    res.status(201).json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};