import { useState } from "react";

export default function DropdownWithSelects({
    label,
    updateValue,
    allOptions,
    value,
}) {
    // const [allOptions, setAllOptions] = useState([]);
    // const [currentValue, setCurrentValue] = useState(startValue);

    function getGroups() {
        const allH = new Array();
        allOptions.sort().forEach((opt) => {
            const group = opt.split(" ")[0]; //opt.charAt(0);
            if (!allH.includes(group)) {
                allH.push(group);
            }
        });
        return allH;
    }

    function getSelection(group) {
        return (
            <select value={group} onChange={onSelect}>
                <option disabled hidden>
                    {group}
                </option>
                {allOptions
                    .filter((opt) => opt.startsWith(group))
                    .map((l) => {
                        return <option key={l}>{l}</option>;
                    })}
            </select>
        );
    }

    function onSelect(event) {
        const selectedValue = event.target.value;

        updateValue(selectedValue);

        const helperButton = document.getElementById("helperButton");
        helperButton.focus();
        helperButton.click({ preventScroll: true });
    }

    return (
        <div className=" flex items-center">
            {label}:
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 btn-sm">
                    {value}
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                    {getGroups().map((g) => {
                        return <li key={g}>{getSelection(g)}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}
