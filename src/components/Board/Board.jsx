import { useState } from "react";
import BoardBox from "./BoardBox";

export default function Board({ allAnswers, chosenAnswers, setChosenAnswers }) {
    if (allAnswers.length != 9) {
        return <></>;
    } else {
        return (
            <div className=" grid grid-cols-3 grid-rows-3 bg-gray-50 gap-2 w-1/2 p-2">
                {allAnswers.map((answer) => (
                    <BoardBox
                        thisAnswer={answer}
                        chosenAnswers={chosenAnswers}
                        setChosenAnswers={setChosenAnswers}
                        key={answer}
                    />
                ))}
            </div>
        );
    }
}
