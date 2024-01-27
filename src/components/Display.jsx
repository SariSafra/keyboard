import React from "react";

function Display({ letters }) {
    return (<>
        {letters.map((letter, index) => (
            <span style={{ color: letter.color, fontSize: letter.size, fontFamily: letter.font }} key={index}>{letter.value}</span>))}
    </>);
}

export default Display
