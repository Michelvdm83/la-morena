import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavigationButton({ updateTitle }) {
    const navigate = useNavigate();

    function goto(target) {
        navigate(target);
        updateTitle();
        const helperButton = document.getElementById("helperButton");
        helperButton.focus();
        helperButton.click({ preventScroll: true });
    }

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
                Menu
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                <li>
                    <a onClick={() => goto("/")}>Home</a>
                </li>
                <li>
                    <a onClick={() => goto("/ww-sudoku")}>Werkwoorden Sudoku</a>
                </li>
                <li>
                    <a onClick={() => goto("/spraak")}>Spraak</a>
                </li>
            </ul>
        </div>
    );
}
