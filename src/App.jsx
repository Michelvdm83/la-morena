import NavigationBar from "./components/NavigationBar/NavigationBar";
import SpeechPage from "./pages/SpeechPage/SpeechPage";
import WwPage from "./pages/WwPage/WwPage";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
    return (
        <div className="w-screen h-screen flex flex-col">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<div></div>} />
                <Route path="/ww-sudoku" element={<WwPage />} />
                <Route path="/spraak" element={<SpeechPage />} />
            </Routes>
        </div>
    );
}

export default App;
