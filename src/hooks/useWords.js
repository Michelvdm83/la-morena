import { useEffect, useState } from "react";
import { HV2Lists } from "./WordLists/2HV/HV2Lists";
import { H3Lists } from "./WordLists/3H/H3Lists";
import { V3Lists } from "./WordLists/3V/V3Lists";
import { V1Lists } from "./WordLists/1V/V1Lists";

export function useWords() {
    const [words, setWords] = useState([]);

    const allNiveauLists = [
        { niveau: "H/V 2", lists: HV2Lists() },
        { niveau: "HAVO 3", lists: H3Lists() },
        { niveau: "VWO 3", lists: V3Lists() },
        { niveau: "VWO 1", lists: V1Lists() },
    ];
    const allNiveaus = allNiveauLists.map((nv) => nv.niveau);
    const [currentNiveau, setCurrentNiveau] = useState(allNiveaus[0]);

    const [allLists, setAllLists] = useState(allNiveauLists[0].lists);
    const [currentWordList, setCurrentWordList] = useState(allLists[0]);
    const currentList = currentWordList.list;
    const currentListOptions = allLists.map((l) => l.list);

    useEffect(() => {
        const wordsList = new Array();
        const rows = currentWordList.item.split("\r\n");
        for (let i = 0; i < rows.length; i++) {
            const nlToFr = rows[i].split("=");
            wordsList.push({ nl: nlToFr[0], fr: nlToFr[1], id: i });
        }
        setWords(wordsList);
    }, [currentWordList]);

    useEffect(() => {
        setCurrentWordList(allLists[0]);
    }, [allLists]);

    function setList(newList) {
        const listIndex = allLists.findIndex((l) => l.list === newList);
        if (listIndex !== -1) {
            setCurrentWordList(allLists[listIndex]);
        }
    }

    function setNiveau(newNiveau) {
        const niveauIndex = allNiveaus.findIndex((n) => n === newNiveau);
        if (niveauIndex !== -1) {
            setCurrentNiveau(allNiveaus[niveauIndex]);
            setAllLists(
                allNiveauLists.find((nv) => nv.niveau === newNiveau).lists
            );
        }
    }

    return {
        words,
        setList,
        allNiveaus,
        currentList,
        currentNiveau,
        setNiveau,
        currentListOptions,
    };
}
