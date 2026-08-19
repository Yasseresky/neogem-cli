#!/usr/bin/env node

import {
  text,
  spinner,
  intro,
  note,
  outro,
  log,
  isCancel,
} from "@clack/prompts";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { sleep, centerText, Margin } from "./utils.js";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient, { vice, teen } from "gradient-string";
import figlet from "figlet";
import { Marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { DatabaseSync } from "node:sqlite";
import { initDatabase, saveMessage, db } from "./db.js";

dotenv.config({ path: "./.env" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const marked = new Marked(markedTerminal());

(async () => {
  console.log(Margin().top(4));
  try {
    intro(
      gradient(["white", "blue", "cyan"])(
        centerText(
          await figlet.text("Neogem!", {
            font: "Ghost",
            horizontalLayout: "centered",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
          }),
        ),
      ),
    );
  } catch (err) {
    console.log("Something went wrong...");
    console.dir(err);
  }

  console.log(Margin().bottom(2));

  const glitch = chalkAnimation.glitch(
    chalk.magentaBright(
      centerText(
        "Welcome to Neo, your AI assistant! Ask me anything. Type 'exit' to quit.",
      ),
    ),
  );

  await sleep();

  glitch.stop();

  console.log(Margin().bottom());

  initDatabase();

  const spin = spinner();

  while (true) {
    const input = await text({
      message: `${chalk.blueBright("You:")}`,
      placeholder: "Type your question here...",
      validate: (value) => {
        if (!value || value.length === 0) return "Please enter a value.";
      },
    });

    if (isCancel(input) || input.toLocaleLowerCase() === "exit") {
      outro("Goodbye, 👏");
      db.close();
      process.exit(0);
    }

    saveMessage("user", input);

    spin.start();
    const response = await getBotResponse(input);
    spin.stop();

    saveMessage("assistant", response);

    log.info(`${chalk.magenta("Neo:")}`);
    note(response);
  }
})();

async function getBotResponse(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: question,
    });

    const text = response.text;
    if (!text) return "No response from AI.";

    return marked.parse(text);
  } catch (error) {
    console.error(error);
    return `Error: ${error.message}`;
  }
}
