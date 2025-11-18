import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request) {
  try {
    // Validate API Key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    const cvData = await request.json();

    const prompt = `
Generate a clean, professional, modern resume based on the following details.

### PERSONAL INFORMATION
Name: ${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}
Phone: ${cvData.personalInfo.phone}
Email: ${cvData.personalInfo.email}
Address: ${cvData.personalInfo.address}

### CAREER SUMMARY
${cvData.careerSummary}

### WORK EXPERIENCE
${cvData.workExperience
  .map(
    (exp) => `
- **${exp.jobTitle}**, ${exp.company} (${exp.startDate} – ${exp.endDate})
  ${exp.description}
`
  )
  .join("\n")}

### EDUCATION
${cvData.education
  .map(
    (edu) => `
- **${edu.degree}**, ${edu.institution}
  Major: ${edu.major}
  Duration: ${edu.startDate} – ${edu.endDate}
`
  )
  .join("\n")}

### SKILLS
${cvData.skills.join(", ")}

Create a polished resume with:
- Clear section headers  
- Bullet points where appropriate  
- Professional tone  
- Industry-standard formatting  
    `;

    // Generate Resume using latest Google model
    const result = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      maxOutputTokens: 2000,
    });

    return Response.json({
      resume: result.text,
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    return Response.json(
      { error: "Failed to generate resume" },
      { status: 500 }
    );
  }
}
