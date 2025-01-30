import "regenerator-runtime/runtime";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { useWords } from "../../hooks/useWords";

export default function SpeechPage() {
    const [words, setWords] = useWords();

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
    const [wordsCorrectlyAnswered, setWordsCorrectlyAnswered] = useState([]);

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            setSupport(false);
        }

        nextSentence();
    }, [words]);

    useEffect(() => {
        console.log(wordsCorrectlyAnswered);
        if (
            currentWord !== null &&
            transcript.toLowerCase() === currentWord.fr
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
    }

    if (!support) {
        return <div>Spraak niet ondersteund door browser</div>;
    }

    if (currentWord !== null) {
        return (
            <div className=" w-full h-full flex flex-col items-center gap-1">
                <div>Microfoon: {listening ? "aan" : "uit"}</div>
                <button
                    onClick={() =>
                        SpeechRecognition.startListening({ language: "fr-FR" })
                    }
                >
                    Start
                </button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <div>gesproken: {transcript}</div>
                <div>Spreek het onderstaande woord uit in het frans:</div>
                <div>{currentWord.nl}</div>
                <input
                    className={" w-20 ml-2" + bg}
                    value={transcript}
                    disabled
                />
                <button
                    className=" btn btn-square btn-sm"
                    onClick={nextSentence}
                >
                    {">>"}
                </button>
                {/* <div>{wordCorrect ? "Dit is juist" : "Helaas"}</div> */}
            </div>
        );
    } else {
        return <div>Alle opdrachten voltooid</div>;
    }
}
