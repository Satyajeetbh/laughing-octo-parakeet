const parseSections = (text) => {
  const lowerText = text.toLowerCase()

  const headings = [
    { key: "skills", match: ["skills", "technical skills"] },
    { key: "experience", match: ["experience", "work experience", "professional experience"] },
    { key: "projects", match: ["projects", "personal projects"] },
    { key: "education", match: ["education", "academic background"] }
  ]

  let indices = []

  headings.forEach(section => {
    section.match.forEach(word => {
      const index = lowerText.indexOf(word)
      if (index !== -1) {
        indices.push({ key: section.key, index })
      }
    })
  })

  indices.sort((a, b) => a.index - b.index)

  let parsed = {
    skills: "",
    experience: "",
    projects: "",
    education: ""
  }

  for (let i = 0; i < indices.length; i++) {
    const current = indices[i]
    const next = indices[i + 1]

    const start = current.index
    const end = next ? next.index : text.length

    parsed[current.key] = text.slice(start, end).trim()
  }

  return parsed
}

module.exports = parseSections