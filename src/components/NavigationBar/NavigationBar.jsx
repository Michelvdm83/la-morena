import NavigationButton from "./NavigationButton";

export default function NavigationBar({ updateTitle, title }) {
    return (
        <div className=" w-full flex sticky h-fit p-2 border-b-4 border-black justify-between items-center">
            <button id="helperButton" className=" h-0 w-0"></button>
            <div className=" text-center">{title}</div>
            <NavigationButton updateTitle={updateTitle} />
        </div>
    );
}
