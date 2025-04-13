import { useEffect, useState } from "react";
import axios from "axios";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TypingText from "../components/TypingText ";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [allPrompts, setAllPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPrompts, setLoadingPrompts] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://blackcms.onrender.com/api/data/promptrix_category"
        );
        const fetched = res.data.data.map((c) => c.title);
        setCategories(fetched);
        setSelected(fetched[0]);
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch prompts
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await axios.get(
          "https://blackcms.onrender.com/api/data/promptrix_data"
        );
        setAllPrompts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching prompts", err);
      } finally {
        setLoadingPrompts(false);
      }
    };
    fetchPrompts();
  }, []);

  // Filter prompts
  useEffect(() => {
    const filtered = allPrompts.filter(
      (p) =>
        p.category === selected &&
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrompts(filtered);
  }, [selected, allPrompts, searchQuery]);

  // Copy handler
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage("Copied to Clipboard!");
    setSnackbarOpen(true);
  };

  return (
    <div
      className="relative min-h-screen p-4 sm:p-6 text-white font-display"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-24">
        {/* Header */}
        <div className="fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-md px-4 py-3 flex flex-wrap justify-between items-center gap-y-3 sm:px-6 sm:py-6">
          <div className="w-full sm:w-auto flex items-center gap-2.5 justify-center sm:justify-start">
            <img src="/favicon.png" className="w-8 h-8" />
            <span className="text-neutral-300 text-lg sm:text-xl font-semibold">
              PROMPTRIX
            </span>
          </div>
          <div className="w-full text-center sm:w-auto">
            <TypingText text="Prompt Everything!" />
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <button className="title-font px-5 py-1.5 rounded-md tracking-wider text-sm sm:text-base text-neutral-300 bg-gradient-to-r from-[#2A0A4C] via-[#6e056e] to-[#530533] cursor-pointer">
              BETA
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-5 px-4 mt-15 lg:mt-0 md:mt-0 sm:mt-5">
          {loadingCategories ? (
            <CircularProgress size={28} style={{ color: "#aaa" }} />
          ) : (
            categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-1.5 rounded-md cursor-pointer text-sm sm:text-base ${
                  selected === cat
                    ? "bg-white/10 text-white"
                    : "bg-transparent text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))
          )}
        </div>

        {/* Search Input */}
        {!loadingCategories && categories.length > 0 && (
          <div className="flex justify-center mb-8 px-4 pt-3">
            <input
              type="text"
              placeholder="Search Prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96 px-4 py-2 text-neutral-300 bg-[#3b08293e] rounded-md border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#c674ac41] placeholder:text-neutral-500"
            />
          </div>
        )}

        {/* Prompt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10 pt-5">
          {loadingPrompts ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <CircularProgress size={40} style={{ color: "#aaa" }} />
            </div>
          ) : filteredPrompts.length === 0 ? (
            <p className="text-center col-span-full text-neutral-400">
              No prompts found.
            </p>
          ) : (
            filteredPrompts.map((prompt, i) => (
              <div
                key={i}
                className="p-4 pb-6 rounded-xl flex flex-col justify-between gap-4 bg-gray-400/10 backdrop-blur-md border border-white/20"
              >
                <div className="flex items-start gap-2">
                  <h2 className="text-lg sm:text-xl text-stone-300 font-semibold">
                    {prompt.title}
                  </h2>
                  <FormatQuoteIcon
                    style={{ fontSize: "28px", color: "gray" }}
                  />
                </div>
                <p className="text-neutral-400 text-sm">
                  {prompt.prompt.slice(0, 200)}
                  {prompt.prompt.length > 150 ? "..." : ""}
                </p>
                <button
                  onClick={() => handleCopy(prompt.prompt)}
                  className="text-xs cursor-pointer text-neutral-400 tracking-wide px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/30 transition"
                >
                  Click to copy the prompt&nbsp;&nbsp;
                  <ContentCopyIcon style={{ fontSize: "15px" }} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
