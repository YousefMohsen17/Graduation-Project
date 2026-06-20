const Groq = require("groq-sdk");
const { PdfReader } = require("pdfreader");
const { createCanvas } = require("canvas");
// const pdfjsLib = require("pdfjs-dist");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Extract text from normal PDF
const extractPDFText = (buffer) => {
  return new Promise((resolve, reject) => {
    let fullText = "";
    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(fullText);
      else if (item.text) fullText += item.text + " ";
    });
  });
};

// Convert first page of PDF to base64 image
const pdfPageToBase64 = async (buffer) => {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext("2d");

  await page.render({ canvasContext: context, viewport }).promise;

  return canvas.toDataURL("image/png").split(",")[1];
};

// Use Groq vision to extract text from image-based PDF
const extractTextWithGroqVision = async (buffer) => {
  const base64Image = await pdfPageToBase64(buffer);

  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct", // ✅ free Groq vision model
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`,
            },
          },
          {
            type: "text",
            text: "Extract ALL text from this image including handwritten text. Return only the extracted text, no commentary.",
          },
        ],
      },
    ],
    max_tokens: 2048,
  });

  return response.choices[0]?.message?.content || "";
};

exports.chatWithAI = async (req, res) => {
  try {
    const question = req.body?.question;
    let contextText = "";

    console.log("question:", question);
    console.log("file:", req.file?.originalname);

    if (!question && !req.file) {
      return res.status(400).json({ message: "Question is required" });
    }

    if (req.file) {
      if (req.file.mimetype === "application/pdf") {
        contextText = await extractPDFText(req.file.buffer);
        console.log("extracted text length:", contextText.trim().length);

        if (!contextText.trim()) {
          console.log("No text found, using Groq Vision...");
          contextText = await extractTextWithGroqVision(req.file.buffer);
          console.log("OCR text length:", contextText.length);
        }

        // trim to fit token limit
        contextText = contextText.substring(0, 3000);
      } else if (req.file.mimetype === "text/plain") {
        contextText = req.file.buffer.toString("utf-8").substring(0, 3000);
      }
    }

    if (!contextText && req.file) {
      return res.status(422).json({
        message: "Could not extract text from this file.",
      });
    }

    const userContent = contextText
      ? `Based on this document:\n\n${contextText}\n\nQuestion: ${question}`
      : question;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful and knowledgeable AI study assistant for engineering students. Answer questions clearly and concisely.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
      max_tokens: 1024,
    });

    const answer =
      chatCompletion.choices[0]?.message?.content || "No answer generated";
    res.json({ answer });
  } catch (error) {
    console.error("AI Error:", error);
    if (error.status === 413) {
      return res.status(413).json({
        message: "Document is too large. Please upload a smaller file.",
      });
    }
    res.status(500).json({ message: error.message });
  }
};
