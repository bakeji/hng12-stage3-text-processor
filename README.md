# Translate.ai  

A modern web application that provides real-time language detection and translation capabilities. Built with React,tailwindcss, this webapp offers a clean, intuitive interface for translating text across multiple languages. This is a solution to HNG12 stage 3 task.  

## Features  

- **Real-time language detection**  
- **Support for multiple target languages**:  
  - English  
  - French  
  - Portuguese  
  - Russian  
  - Turkish  
  - Spanish  
- **Responsive design for mobile and desktop**  
- **Chat-like interface for translation history**  
- **New chat functionality**  
- **Error handling and loading states**  
- **Input validation**  

## Prerequisites  

To run this application, you need:  

- Node.js (latest stable version recommended)
- Chrome browser 
- Access to chrome AI language detection and translation capabilities
- To enable Experimental translation API flag in chrome browser
- To Language detection web platform API flag in chrome brower
 

## Installation  
1. **Clone the repository**:

   ```bash
   git clone https://github.com/bakeji/hng12-stage3-text-processor
   cd text-generator

2. **Install dependencies:**:

   ```bash
   pnpm install

3. **Run the development server:**:

   ```bash
   pnpm dev

4. **Open the app:**
Visit http://localhost:5173 in your browser to view the app.

## Usage
1. Enter text in the input field at the bottom of the screen.
2. Select your target language from the dropdown menu.
3. Click the send button to get your translation.

## The app will:

- Detect the source language automatically.
- Display the detected language.
- Show the translated text in your chosen target language.