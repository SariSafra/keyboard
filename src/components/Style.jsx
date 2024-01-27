import React from "react";

function Style({ styles, on_style_click }) {
    const handle_click = ({ target }) => on_style_click(target.value);
    return (<>
        {styles.map((style, index) => (
            <button onClick={handle_click} value={style} key={index} id={style}>{style}</button>))}
    </>
    )
}

export default Style