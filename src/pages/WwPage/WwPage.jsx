import { useEffect, useState } from "react";
import Board from "../../components/Board/Board";

export default function WwPage() {
    const avoir = [
        "j'ai",
        "tu as",
        "elle a",
        "il a",
        "on a",
        "nous avons",
        "vous avez",
        "ils ont",
        "elles ont",
    ];
    const etre = [
        "je suis",
        "tu es",
        "elle est",
        "il est",
        "on est",
        "nous sommes",
        "vous êtes",
        "ils sont",
        "elles sont",
    ];
    const aller = [
        "je vais",
        "tu vas",
        "elle va",
        "il va",
        "on va",
        "nous allons",
        "vous allez",
        "ils vont",
        "elles vont",
    ];
    const [allAnswers, setAllAnswers] = useState([]);
    const [chosenAnswers, setChosenAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
    const [selectedVerb, setSelectedVerb] = useState("avoir");
    const [difficulty, setDifficulty] = useState("normal");

    useEffect(() => {
        let arrayLength1;
        let arrayLength2;
        let arrayLength3;

        arrayLength1 =
            difficulty === "normal" ? 3 : Math.floor(Math.random() * 9) + 1;
        if (difficulty !== "normal") {
            if (arrayLength1 < 9) {
                arrayLength2 =
                    Math.floor(Math.random() * (9 - arrayLength1)) + 1;
            } else {
                arrayLength2 = 0;
            }
        } else {
            arrayLength2 = 3;
        }

        arrayLength3 = 9 - arrayLength1 - arrayLength2;

        const shuffledAvoir = getShuffledArray(avoir).slice(
            0,
            selectedVerb === "avoir" ? arrayLength1 : arrayLength2
        );
        const shuffledEtre = getShuffledArray(etre).slice(
            0,
            selectedVerb === "etre" ? arrayLength1 : arrayLength3
        );

        const shuffledAller = getShuffledArray(aller).slice(
            0,
            selectedVerb === "aller"
                ? arrayLength1
                : selectedVerb === "avoir"
                ? arrayLength2
                : arrayLength3
        );

        const tempAll = getShuffledArray(
            shuffledAvoir.concat(shuffledEtre).concat(shuffledAller)
        );

        switch (selectedVerb) {
            case "avoir": {
                setCorrectAnswers(shuffledAvoir);
                break;
            }
            case "etre": {
                setCorrectAnswers(shuffledEtre);
                break;
            }
            case "aller": {
                setCorrectAnswers(shuffledAller);
                break;
            }
        }

        setAllAnswers(tempAll);
    }, [selectedVerb, difficulty]);

    function getShuffledArray(originalArray) {
        const shuffledArray = originalArray.toSpliced(0, 0);

        for (let i = shuffledArray.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffledArray[i];
            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = temp;
        }

        return shuffledArray;
    }

    function checkAnswers() {
        if (chosenAnswers.length === correctAnswers.length) {
            if (
                correctAnswers.every((answer) => {
                    return chosenAnswers.indexOf(answer) !== -1;
                })
            ) {
                setCorrectlyAnswered(true);
            } else {
                setCorrectlyAnswered(false);
            }
        } else {
            setCorrectlyAnswered(false);
        }
    }

    function updateVerb(event) {
        setChosenAnswers([]);
        setCorrectlyAnswered(false);
        setSelectedVerb(event.target.value);
    }

    function selectDifficulty(event) {
        setChosenAnswers([]);
        setCorrectlyAnswered(false);
        setDifficulty(event.target.value);
    }

    return (
        <div className=" flex flex-col w-full h-full gap-2 items-center justify-center">
            <label>
                Werkwoord:
                <select
                    className=" w-fit"
                    onChange={updateVerb}
                    defaultValue={"avoir"}
                >
                    <option value="avoir">Avoir</option>
                    <option value="etre">Être</option>
                    <option value="aller">Aller</option>
                </select>
            </label>
            <select
                className=" w-fit"
                onChange={selectDifficulty}
                defaultValue={"normal"}
            >
                <option value="normal">Selecteer de 3 juiste antwoorden</option>
                <option value="hard">Selecteer alle juiste antwoorden</option>
            </select>
            <Board
                allAnswers={allAnswers}
                setChosenAnswers={setChosenAnswers}
                chosenAnswers={chosenAnswers}
            />
            <button
                className=" rounded-full bg-green-700 w-fit p-2"
                onClick={checkAnswers}
            >
                controleer antwoorden
            </button>
            <div className=" w-fit min-w-1 h-10 text-center">
                {correctlyAnswered && "Dat is correct!"}
            </div>
        </div>
    );
}
