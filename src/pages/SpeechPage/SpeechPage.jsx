import "regenerator-runtime/runtime";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";

export default function SpeechPage() {
    class Sentence {
        constructor(first, last, answer) {
            this.firstPart = first;
            this.lastPart = last;
            this.correctAnswer = answer;
        }
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const [support, setSupport] = useState(true);
    const [spokenWord, setSpokenWord] = useState("");
    const [wordCorrect, setWordCorrect] = useState(false);
    const [bg, setBg] = useState("");
    const [sentences, setSentences] = useState([]);
    const [currentSentence, setCurrentSentence] = useState(null);
    const [sentencesCorrectlyAnswered, setSentencesCorrectlyAnswered] =
        useState([]);

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            setSupport(false);
        }
        const first = new Sentence("Sur ", "(de tafel)", "la table");
        if (sentences.length < 1) {
            setSentences(...sentences, first);
        }
        setCurrentSentence(first);
    }, []);

    useEffect(() => {
        if (
            currentSentence !== null &&
            transcript.toLowerCase() === currentSentence.correctAnswer
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

    if (!support) {
        return <div>Spraak niet ondersteund door browser</div>;
    }

    function nextSentence() {
        if (wordCorrect) {
            setSentencesCorrectlyAnswered(
                ...sentencesCorrectlyAnswered,
                currentSentence
            );
            setSentences(sentences.filter((st) => st !== currentSentence));
        }
    }

    return (
        <div className=" w-full h-full flex flex-col items-center">
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
            <div>{`support: ${support}`}</div>
            <div className=" flex w-full justify-center gap-1">
                <div>{currentSentence && currentSentence.firstPart}</div>
                <input
                    className={" w-20 ml-2" + bg}
                    value={transcript}
                    disabled
                />
                {currentSentence && currentSentence.lastPart}
            </div>
            {/* <div>{wordCorrect ? "Dit is juist" : "Helaas"}</div> */}
        </div>
    );
}
