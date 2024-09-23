import { useState } from "react";

export default function BoardBox({
    chosenAnswers,
    setChosenAnswers,
    thisAnswer,
}) {
    const [selected, setSelected] = useState(false);
    const bgColor =
        chosenAnswers.indexOf(thisAnswer) >= 0 ? "bg-green-50" : "bg-white";

    function update() {
        if (selected) {
            const newAnswers = chosenAnswers.filter((answer) => {
                return thisAnswer.localeCompare(answer) !== 0;
            });
            setChosenAnswers(newAnswers);
        } else {
            const updatedAnswers = [...chosenAnswers, thisAnswer];
            setChosenAnswers(updatedAnswers);
        }
        setSelected(!selected);
    }

    return (
        <div className={" cursor-pointer " + bgColor} onClick={update}>
            {thisAnswer}
        </div>
    );
}
