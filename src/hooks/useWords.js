import { useEffect, useState } from "react";

export function useWords() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const listWords = new Array();
        listWords.push(
            { nl: "het huis", fr: "la maison", id: 0 },
            { nl: "het bed", fr: "le lit", id: 1 }
        );

        setWords(listWords);
    }, []);

    return [words, setWords];
}
