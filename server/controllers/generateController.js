import openai from "../config/openai.js";
import Post from "../models/Post.js";

export const generatePost = async (req, res) => {
  try {
    const { topic, platform, tone, userId, image } = req.body;

    // Use a Vision model if an image is provided, otherwise standard
    const modelName = image ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile";

    const messages = [
      {
        role: "user",
        content: image 
          ? [
              { type: "text", text: `Write a ${tone} ${platform} post about this image. Topic context: ${topic}` },
              { type: "image_url", image_url: { url: image } }
            ]
          : `Write a ${tone} ${platform} post about: ${topic}`
      }
    ];

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: messages,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    // Save to DB (Update your Post model to include an 'image' field if you want to save the URL)
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
    res.status(500).json({ error: "Vision generation failed" });
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