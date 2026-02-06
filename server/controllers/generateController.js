import openai from "../config/openai.js";
import Post from "../models/Post.js";

export const generatePost = async (req, res) => {
  try {
    const { topic, platform, tone, userId, image } = req.body;

    const modelName = image
      ? "meta-llama/llama-4-scout-17b-16e-instruct"
      : "llama-3.3-70b-versatile";

    const systemPrompt = `
You generate ONLY final social media captions.

STRICT RULES:
- Output ONLY the caption
- NO explanations
- NO tips
- NO headings
- NO bullet points
- NO quotation marks
- NO extra lines before or after
- Must be ready to copy-paste
`;

    const userPrompt = image
      ? [
          {
            type: "text",
            text: `
Generate a ${tone}, viral ${platform} caption based on this image.
Context: ${topic}

Caption requirements:
- 2–4 short lines
- Trendy, Gen-Z friendly tone
- Emojis allowed but minimal
- End with relevant hashtags only
            `,
          },
          {
            type: "image_url",
            image_url: { url: image },
          },
        ]
      : `
Generate a ${tone}, viral ${platform} caption.

Context: ${topic}

Caption requirements:
- 2–4 short lines
- Trendy, Gen-Z friendly tone
- Emojis allowed but minimal
- End with relevant hashtags only
        `;

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.6,
    });

    const content = response.choices[0].message.content.trim();

    const savedPost = await Post.create({
      userId,
      topic,
      platform,
      tone,
      content,
      image,
    });

    res.status(200).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
