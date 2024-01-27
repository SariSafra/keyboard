import React from "react";

function Letter_case({ cases, funcToSwitch }) {
    const handle_click = ({ target }) => {
        const item = target.value;
        funcToSwitch(item);
    };

    return (<>
        {cases.map((let_case, index) => (
            <button onClick={handle_click} value={let_case} key={index}>{let_case} {let_case == "UPPER" ? 'ALL' : 'all'}</button>))}
    </>);
}

export default Letter_case