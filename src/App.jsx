import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SpeechPage from "./pages/SpeechPage/SpeechPage";
import WwPage from "./pages/WwPage/WwPage";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
    const [title, setTitle] = useState("Home");

    function updateTitle() {
        switch (location.hash) {
            case "#/ww-sudoku":
                setTitle("Werkwoorden sudoku");
                break;
            case "#/spraak":
                setTitle("Woordjes op spraak");
                break;
            default:
                setTitle("Home");
                break;
        }
    }

    useEffect(() => {
        updateTitle();
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col">
            <NavigationBar updateTitle={updateTitle} title={title} />
            <Routes>
                <Route path="/" element={<div></div>} />
                <Route path="/ww-sudoku" element={<WwPage />} />
                <Route path="/spraak" element={<SpeechPage />} />
            </Routes>
        </div>
    );
}

export default App;
