import { useState, useRef } from "react";
import SlideBar from "../components/slidebar";
import { Loader2, Search as SearchIcon } from "lucide-react";

const cleanTextResponse = (text) => {
    return text
        .replace(/^```html\s*/i, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();
};

const Search = () => {
    const [movieName, setMovieName] = useState("");
    const [responseHtml, setResponseHtml] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const handleSearch = async () => {
        if (!movieName.trim()) return;
        setLoading(true);
        setError("");
        setResponseHtml("");

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`;

            const data = {
                contents: [
                    {
                        parts: [
                            {
                                text: `generate a response of the searched ${movieName}. Don't ask any other question just provide the ${movieName} details in the given format.

Do NOT wrap your response in any Markdown or code block (e.g., no \`\`\`html). Return only plain HTML elements.

Format the response strictly as a list. Put the br tags and new line tag as well:

<h1 class="text-4xl font-bold text-center mb-4">Full name of the ${movieName} in standard form</h1>
<p class="mb-2">Director: [Director of the ${movieName}]</p>
<p class="mb-2">Release Date: [release date of the ${movieName}]</p>
<p class="mb-2">Characters: [Main Characters of the ${movieName}]</p>
<p class="mb-2">Actors and Actresses: [Actors and Actresses of the ${movieName}]</p>
<p class="mb-2">Story: [Storyline of the ${movieName}]</p>
<p class="mb-2">Collection: [Box office Collection of the ${movieName}]</p>
<p class="mb-2">Rating: [IMDB rating of the ${movieName}]</p>
<p class="mb-2">Available on : [Name of the platform the ${movieName} is available on]</p>`
                            }
                        ]
                    }
                ]
            };

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            const textResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (textResponse) {
                setResponseHtml(cleanTextResponse(textResponse));
            } else {
                setError("No response from Gemini API.");
            }
        } catch (err) {
            setError("Failed to load.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-row min-h-screen bg-gray-950 text-white">
            <SlideBar />

            <div className="flex-1 p-6 bg-gray-950 overflow-y-auto">
                <div className="flex flex-col items-center justify-center gap-6 mt-10">
                    <h1 className="text-4xl md:text-6xl font-mono font-bold text-white">Cine<span className=" text-red-600">PCX</span></h1>
                    <div className="flex flex-col md:flex-row items-center w-full md:w-2/3 gap-4">
                        <input
                            ref={inputRef}
                            type="text"
                            value={movieName}
                            onChange={(e) => setMovieName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter a movie name..."
                            autoFocus
                            className="p-4 rounded-xl border border-gray-700 bg-gray-800 text-white w-full shadow focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold transition duration-200 ${
                                loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <SearchIcon />}
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-400 font-semibold text-center">
                            {error}
                        </div>
                    )}

                    {responseHtml && (
                        <div
                            className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-3xl w-full animate-fade-in transition-all"
                            dangerouslySetInnerHTML={{ __html: responseHtml }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
