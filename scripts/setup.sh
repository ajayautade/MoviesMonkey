#!/bin/bash
# ─── MovieMonkey Setup Script ────────────────────────────────
# Quick setup for local development

set -e

echo "🎬 MovieMonkey Setup"
echo "===================="

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required. Install from https://nodejs.org"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required."; exit 1; }

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"

# Check for .env file
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env and add your API keys."
    echo "   TMDB: https://www.themoviedb.org/settings/api"
    echo "   OMDB: https://www.omdbapi.com/apikey.aspx"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  npm start        — Start development server"
echo "  npm test         — Run tests"
echo "  npm run build    — Build for production"
echo "  make help        — Show all available make commands"
echo ""
