import React from "react";

function Letter({ letters, on_letter_click, let_case }) {
    const handle_click = ({ target }) => {
        const item = target.value;
        on_letter_click(item);
    };

    return (<>
        {letters.map((letter, index) => (
            let_case ? <button onClick={handle_click} value={letter.toUpperCase()} key={index} id={letter} className={'letter'}>{letter.toUpperCase()}</button>
                : <button onClick={handle_click} value={letter} key={index} id={letter} className={'letter'}>{letter}</button>))}
    </>);
}

export default Letter