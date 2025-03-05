import React, { useContext, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";
import { searchSymbols } from "../api/stock-api";

const Search = () => {
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);
    const { darkMode } = useContext(ThemeContext);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = async () => {
        try {
            if (input) {
                const searchResults = await searchSymbols(input);
                const matches = searchResults.bestMatches || [];
                const formattedResults = matches.map((item) => ({
                    symbol: item["1. symbol"],
                    name: item["2. name"],
                }));
                setBestMatches(formattedResults);
            }
        } catch (error) {
            setBestMatches([]);
            console.log(error);
        }
    };

    return (
        <div className={`flex items-center my-2 border-2 mt-0 rounded-md relative z-50 w-96 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
            <input
                type="text"
                value={input}
                className={`w-full px-3 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900 text-black" : "bg-white text-black border-neutral-200"}`}
                placeholder="Search stock"
                onChange={(event) => {
                    setInput(event.target.value);
                }}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateBestMatches();
                    }
                }}
            />
            {input && (
                <button
                    onClick={clear}
                    className="flex items-center gap-0 appearance-none bg-transparent border-none focus:outline-none hover:bg-transparent active:bg-transparent"
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    <XMarkIcon className="h-4 w-4 text-gray-500" />
                </button>
            )}
            <button
                onClick={updateBestMatches}
                className="h-8 w-8 rounded-md flex justify-center items-center p-1 bg-indigo-600"
            >
                <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
            </button>
            {input && bestMatches.length > 0 ? <SearchResults results={bestMatches} /> : null}
        </div>
    );
};

export default Search;