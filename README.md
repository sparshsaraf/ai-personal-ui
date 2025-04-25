# AI Personal UI

> A simple Node.js app that summarizes the latest insights about a selected subtopic (e.g. tech, games, science) using free AI inference APIs.  
> Built with Express.js, vanilla JavaScript, and a free Hugging Face summarization model.

---

## 🚀 Features

- 🔍 **Real-time summarization** of any chosen subtopic  
- 💻 **Frontend**: HTML, CSS, JavaScript  
- ⚙️ **Backend**: Express.js with a free Hugging Face model  
- 🔄 **Lightweight**: no paid API keys required (optional if you swap to OpenAI)  
- 🌐 **Responsive** layout, easy to extend

---

## 📂 Project Structure



---

## ⚙️ Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/ai-personal-ui.git
   cd ai-personal-ui


npm install

# if using Hugging Face
HUGGINGFACE_API_KEY=your_huggingface_inference_token

# (optional) if you prefer OpenAI instead
OPENAI_API_KEY=your_openai_api_key


npm start


🔥 Usage

    Open your browser to http://localhost:3000.

    Click a category (News, Sports, Entertainment, Gaming, Academics).

    Click a subtopic (e.g. “International”, “Basketball”, “Movies”).

    Watch the AI-generated summary appear instantly.

    Optional “Read More” button opens a real website for deeper reading.

🛠️ How It Works

    Client (public/script.js) sends a POST to /api/summarize with { subtopic }.

    Server (server.js) routes /api/summarize and calls Hugging Face’s
    facebook/bart-large-cnn model (or OpenAI GPT) to generate a summary.

    The server responds with { summary }.

    The client displays the summary and a “Read More” link.

📦 Technologies

    Node.js & Express.js — backend

    Axios — HTTP requests to AI API

    cors, dotenv — middleware & config

    Hugging Face Inference API (free summarization model)

    Vanilla JS, HTML5, CSS3 — frontend

✨ Future Improvements

    Add more subtopic categories & custom URLs

    Dark / light theme toggle

    Store user preferences & history

    Integrate other OpenAI or local LLMs

    Deploy to Heroku / Vercel / Railway

🤝 Contributing

    Fork the repo

    Create your feature branch (git checkout -b feature/...)

    Commit your changes (git commit -m "feat: ..."), push (git push origin feature/...)

    Open a Pull Request
