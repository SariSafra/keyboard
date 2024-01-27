import React from "react";

function Delete_Undo({ on_delete_click, amount, type }) {
    const handle_click = () => on_delete_click(amount);
    return (
        <button onClick={handle_click}>{type} {amount}</button>
    )
}

export default Delete_Undo

