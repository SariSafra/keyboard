import React from "react";

function Keyboard_language({ languages, funcToSwitch }) {
    const handle_click = ({ target }) => {
        const item = target.value;
        funcToSwitch(item);
    };

    return (<>
        {
            languages.map((language, index) => (
                <button onClick={handle_click} value={language} key={index}>{language}</button>))}
    </>);
}

export default Keyboard_language