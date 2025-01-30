import { useNavigate } from "react-router-dom";

export default function NavigationButton() {
    const navigate = useNavigate();

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
                Click
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                <li>
                    <a onClick={() => navigate("/")}>Home</a>
                </li>
                <li>
                    <a onClick={() => navigate("/ww-sudoku")}>
                        Werkwoorden Sudoku
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate("/spraak")}>Spraak</a>
                </li>
            </ul>
        </div>
    );
}
