# Digital World Explorer

A modern web application for exploring and learning about a digital world through an interactive map interface.

## Features

- Interactive map view using Mapbox GL
- Information panel for detailed location descriptions
- Modern, responsive UI built with React and Tailwind CSS
- Smooth transitions and elegant design

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Mapbox token:
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```
   You can get a free Mapbox token by signing up at https://www.mapbox.com/

4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Mapbox GL for interactive maps
- Headless UI for accessible components
- Heroicons for beautiful icons

## Project Structure

- `src/App.tsx` - Main application component
- `src/index.css` - Global styles and Tailwind imports
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration 