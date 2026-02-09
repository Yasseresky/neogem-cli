#!/usr/bin/env node

import { text, spinner, intro, outro, log, isCancel } from "@clack/prompts";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

(async () => {
  const spin = spinner();
  intro(
    "Welcome to Neo, your AI assistant! Ask me anything. Type 'exit' to quit.",
  );
  while (true) {
    const input = await text({
      message: "User",
      placeholder: "Ask Neo about Something!",
      validate: (value) => {
        if (!value || value.length === 0) return "Please enter a value.";
      },
    });

    if (isCancel(input) || input.toLocaleLowerCase() === "exit") {
      outro("Goodbye, 👏");
      process.exit(0);
    }

    spin.start();
    const response = await getBotResponse(input);
    spin.stop();

    log.info(`Neo: ${response}`);
  }
})();

async function getBotResponse(question) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: question,
  });

  return response.text;
}
