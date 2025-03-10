import "regenerator-runtime/runtime";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { useWords } from "../../hooks/useWords";
import DropdownWithSelects from "../../components/DropdownWithSelects/DropdownWithSelects";

export default function SpeechPage() {
    const {
        words,
        setList,
        allNiveaus,
        setNiveau,
        currentListOptions,
        currentNiveau,
        currentList,
    } = useWords();

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const [support, setSupport] = useState(true);
    const [bg, setBg] = useState("");

    const [wordCorrect, setWordCorrect] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [spokenWord, setSpokenWord] = useState("");
    const [wordsCorrectlyAnswered, setWordsCorrectlyAnswered] = useState([]);

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            setSupport(false);
        }

        nextSentence();
    }, [words]);

    useEffect(() => {
        let currentSpoken = transcript;
        if (
            currentWord !== null &&
            currentSpoken.length > 0 &&
            currentWord.fr.charAt(currentWord.fr.length - 1) === "?"
        ) {
            currentSpoken += "?";
        }
        setSpokenWord((old) => currentSpoken);

        if (
            currentWord !== null &&
            currentSpoken.toLowerCase() === currentWord.fr.toLowerCase()
        ) {
            setWordCorrect(true);
            setBg(" bg-green-500");
        } else {
            setWordCorrect(false);
            if (transcript.trim() === "") {
                setBg("");
            } else {
                setBg(" bg-red-500");
            }
        }
    }, [transcript]);

    function nextSentence() {
        const newWordsCorrect = wordsCorrectlyAnswered.slice();
        if (wordCorrect) {
            newWordsCorrect.push(currentWord);
            setWordsCorrectlyAnswered((ws) => newWordsCorrect);
        }
        if (words.length > newWordsCorrect.length) {
            const wordsToAnswer = words.slice();
            newWordsCorrect.forEach((wc) => {
                const index = wordsToAnswer.findIndex((w) => w.id === wc.id);
                wordsToAnswer.splice(index, 1);
            });
            const newIndex = Math.floor(Math.random() * wordsToAnswer.length);
            setCurrentWord(wordsToAnswer[newIndex]);
        } else {
            setCurrentWord(null);
        }
        setWordCorrect(false);
        resetTranscript();
        setSpokenWord("");
    }

    if (!support) {
        return <div>Spraak niet ondersteund door browser</div>;
    }

    function chapterListCallback(selectedList) {
        setWordsCorrectlyAnswered([]);
        setWordCorrect(false);
        resetTranscript();
        setSpokenWord("");
        setList(selectedList);
    }

    function niveauListCallback(selectedNiveau) {
        setWordsCorrectlyAnswered([]);
        setWordCorrect(false);
        resetTranscript();
        setSpokenWord("");
        setNiveau(selectedNiveau);
    }

    // function getGroups() {
    //     const allH = new Array();
    //     allOption.sort().forEach((opt) => {
    //         const group = opt.charAt(0);
    //         if (!allH.includes(group)) {
    //             allH.push(group);
    //         }
    //     });
    //     return allH;
    // }

    // function getSelection(group) {
    //     return (
    //         <select value={group} onChange={onSelect}>
    //             <option disabled hidden>
    //                 {group}
    //             </option>
    //             {allOption
    //                 .filter((opt) => opt.startsWith(group))
    //                 .map((l) => {
    //                     return <option key={l}>{l}</option>;
    //                 })}
    //         </select>
    //     );
    // }

    return (
        <div className=" w-full h-full flex flex-col items-center gap-1">
            <DropdownWithSelects
                allOptions={allNiveaus}
                label={"Niveau/jaar"}
                updateValue={niveauListCallback}
                value={currentNiveau}
            />
            <DropdownWithSelects
                allOptions={currentListOptions}
                label={"Lijst"}
                updateValue={chapterListCallback}
                value={currentList}
            />

            {currentWord !== null ? (
                <>
                    <div>Microfoon: {listening ? "aan" : "uit"}</div>
                    <div className=" flex justify-center gap-3">
                        <button
                            className=" bg-green-200 pl-1 pr-1 rounded-btn"
                            onClick={() =>
                                SpeechRecognition.startListening({
                                    language: "fr-FR",
                                })
                            }
                        >
                            Start
                        </button>
                        <button
                            className=" bg-red-200 pl-1 pr-1 rounded-btn"
                            onClick={SpeechRecognition.stopListening}
                        >
                            Stop
                        </button>
                    </div>
                    <div>Spreek het onderstaande uit in het frans:</div>
                    <div>{currentWord.nl}</div>
                    <div
                        className={" w-fit ml-2 text-center h-6 pl-2 pr-2" + bg}
                    >
                        {spokenWord}
                    </div>

                    <button
                        className=" btn btn-square btn-sm"
                        onClick={nextSentence}
                    >
                        {">>"}
                    </button>
                </>
            ) : (
                <div>Alle opdrachten voltooid</div>
            )}
        </div>
    );
}
