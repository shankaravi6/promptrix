import { useEffect, useState } from "react";
import axios from "axios";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TypingText from "../components/TypingText ";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
  const [premiumPrompts, setPremiumPrompts] = useState([]);
  const [loadingPremium, setLoadingPremium] = useState(true);

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

  useEffect(() => {
    const fetchPrompts = async () => {
      if (!selected) return;
      try {
        setLoadingPrompts(true);
        const res = await axios.get(
          `https://blackcms.onrender.com/api/data/promptrix_data/category/${selected}`
        );
        setAllPrompts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching prompts", err);
      } finally {
        setLoadingPrompts(false);
      }
    };
    fetchPrompts();
  }, [selected]);

  useEffect(() => {
    const filtered = allPrompts.filter(
      (p) =>
        p.category === selected &&
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrompts(filtered);
  }, [selected, allPrompts, searchQuery]);

  // Fetch premium prompts
  useEffect(() => {
    if (!selected) return;

    const fetchPremiumPrompts = async () => {
      try {
        setLoadingPremium(true);
        const res = await axios.get(
          `https://blackcms.onrender.com/api/data/premdata/cate/${selected}`
        );
        setPremiumPrompts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching premium prompts", err);
      } finally {
        setLoadingPremium(false);
      }
    };

    fetchPremiumPrompts();
  }, [selected]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage("Copied to Clipboard!");
    setSnackbarOpen(true);
  };

  return (
    <div
      className="relative min-h-screen p-4 sm:p-6 text-white font-display"
      style={{
        backgroundImage: "url('/images/background2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 min-h-screen pt-24">
        <div className="fixed top-0 left-0 w-full z-20 bg-black/30 backdrop-blur-md px-4 py-3 flex flex-wrap justify-between items-center gap-y-3 sm:px-6 sm:py-6">
          <div className="w-full sm:w-auto flex items-center gap-2.5 justify-center sm:justify-start">
            <img src="/favicon.png" className="w-8 h-8" />
            <span className="text-orange-100 text-xl sm:text-2xl tracking-wider title-font">
              PROMPTRIX
            </span>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <button className="title-font px-5 py-1.5 rounded-md tracking-wider text-sm sm:text-base text-orange-100 bg-gradient-to-r from-[#0e0000] via-[#4a1703] to-[#a43806ca] cursor-pointer">
              BETA
            </button>
          </div>
        </div>

        <div className="w-full text-center flex justify-center items-center">
          <TypingText text="Prompt Everything!" />
        </div>

        <div className="flex flex-wrap gap-3 pt-12 justify-center mb-5 px-4 mt-0">
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
                    : "text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))
          )}
        </div>

        {!loadingCategories && categories.length > 0 && (
          <div className="flex justify-center mb-8 px-4 pt-3">
            <input
              type="text"
              placeholder="Search Prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96 px-4 py-2 text-neutral-300 bg-[#1f120584] rounded-md border border-amber-900 focus:outline-none focus:ring-1 focus:ring-[#c6a47441] placeholder:text-neutral-500"
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
                  <h2 className="text-lg sm:text-xl text-stone-300 sub-font">
                    {prompt.title}
                  </h2>
                  <FormatQuoteIcon
                    style={{
                      fontSize: "28px",
                      color: "rgb(228 175 140 / 76%)",
                    }}
                  />
                </div>
                <p className="text-neutral-400 text-sm">
                  {prompt.prompt.slice(0, 200)}
                  {prompt.prompt.length > 150 ? "..." : ""}
                </p>
                <div className="flex items-start">
                  <button
                    onClick={() => handleCopy(prompt.prompt)}
                    className="text-xs cursor-pointer text-stone-400 tracking-wide px-3 py-1.5 rounded-sm bg-orange-600/15 hover:bg-orange-500/20 transition"
                  >
                    Click to copy the prompt&nbsp;&nbsp;
                    <ContentCopyIcon style={{ fontSize: "15px" }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Premium Prompts */}
        {!loadingPremium &&
          premiumPrompts.filter((item) => item.category === selected).length >
            0 && (
            <div className="px-4 pb-20">
              <h2 className="text-xl sm:text-2xl text-center text-orange-200 main-font mb-6 tracking-wide">
                Premium &nbsp; Prompts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumPrompts
                  .filter((item) => item.category === selected)
                  .map((item, i) => (
                    <div
                      key={`premium-${i}`}
                      className="p-4 pb-6 rounded-xl flex flex-col justify-between gap-4 bg-orange-200/10 backdrop-blur-md border border-orange-300/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-start gap-2">
                            <h2 className="text-lg sm:text-xl text-orange-100 sub-font">
                              {item.title}
                            </h2>
                            <FormatQuoteIcon
                              style={{
                                fontSize: "28px",
                                color: "rgb(228 175 140 / 76%)",
                              }}
                            />
                          </div>
                          <div className="text-left pt-1">
                            <button
                              disabled
                              className="text-xs text-orange-300 bg-orange-800/20 px-3 py-1.5 rounded-sm"
                            >
                              Premium Prompt
                            </button>
                          </div>
                        </div>
                        <span className="bg-orange-300/10 text-orange-200 text-sm px-2 py-1 rounded-md border border-orange-400/20">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-neutral-500 italic blur-sm select-none text-justify">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                        Quisque faucibus ex sapien vitae pellentesque sem
                        placerat...
                      </p>
                      <div className="text-right pt-1">
                        <button
                          disabled
                          className="text-xs text-orange-200 bg-orange-100/20 px-3 py-1.5 rounded-sm cursor-pointer"
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <ShoppingCartIcon
                              sx={{ color: "#fcc49c", fontSize: "20px" }}
                            />
                            <p>Buy Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          icon={<ContentPasteGoIcon sx={{ color: "#fcc49c" }} />}
          severity="warning"
          sx={{
            width: "100%",
            backgroundColor: "#333",
            color: "#fcc49c",
            boxShadow: 3,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
