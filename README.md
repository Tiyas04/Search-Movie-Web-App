# Movie Search Web App

A web application for searching movies using the Gemini API, featuring user authentication with Firebase and built with React.js.

> **Author:** Tiyas

## Features

- Search for movies via the Gemini API
- User authentication powered by Firebase
- Responsive and user-friendly React.js interface
- Modular and extensible codebase

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/movie-search-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd movie-search-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up your Firebase project and Gemini API credentials as described in the documentation.

5. Start the development server:
    ```bash
    npm start
    ```

## Usage

1. Sign up or log in using your email and password.
2. Enter a movie title in the search bar.
3. View search results fetched from the Gemini API.

Example usage in code:
```javascript
import { searchMovies } from './api/gemini';

const results = await searchMovies('Inception');
console.log(results);
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.