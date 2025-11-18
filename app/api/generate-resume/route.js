import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request) {
  try {
    // Check if API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    const cvData = await request.json();

    const prompt = `
      Create a professional resume based on the following information:
      
      Personal Information:
      Name: ${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}
      Phone: ${cvData.personalInfo.phone}
      Email: ${cvData.personalInfo.email}
      Address: ${cvData.personalInfo.address}
      
      Career Summary: ${cvData.careerSummary}
      
      Work Experience:
      ${cvData.workExperience
        .map(
          (exp) => `
        Position: ${exp.jobTitle}
        Company: ${exp.company}
        Duration: ${exp.startDate} - ${exp.endDate}
        Description: ${exp.description}
      `
        )
        .join("\n")}
      
      Education:
      ${cvData.education
        .map(
          (edu) => `
        Degree: ${edu.degree}
        Institution: ${edu.institution}
        Major: ${edu.major}
        Duration: ${edu.startDate} - ${edu.endDate}
      `
        )
        .join("\n")}
      
      Skills: ${cvData.skills.join(", ")}
      
      Please generate a professional, well-formatted resume that highlights the candidate's strengths and matches industry standards. Focus on clarity, professionalism, and impact.
    `;

    const { text } = await generateText({
      model: google("gemini-pro"),
      prompt: prompt,
      maxTokens: 2000,
    });

    return Response.json({ resume: text });
  } catch (error) {
    console.error("Error generating resume:", error);
    return Response.json(
      { error: "Failed to generate resume" },
      { status: 500 }
    );
  }
}
