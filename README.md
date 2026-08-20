# Neogem

Neogem is an AI chat CLI.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **API Key**: Create a `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   _You can get your key from [Google AI Studio](https://makersuite.google.com/app/apikey)._

## Installation

### Globally

To install and run Neogem as a CLI command:

```bash
npm install -g .
# Then simply run:
neo
```

### Locally

Alternatively, you can link it locally for development:

```bash
npm link
# Then simply run:
neo
```

## Features

- AI chat interface in the terminal.
- Markdown rendering with syntax highlighting.
- Chat history automatically saved to a local SQLite database (`local.db`).
