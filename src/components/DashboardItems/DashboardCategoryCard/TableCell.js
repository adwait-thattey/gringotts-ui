import React from "react";
import './DashboardCategoryCard.scss';


const TableCell = (props) => {


    let classes = "category-card__inner_cell ";
    if (props.active) {
        classes += "category-card__inner_cell--selected"
    }

    if(props.object) {
        return (
            <td className={classes}
                onClick={(e) => props.click(props.object)}
            >
                {props.content}
                <span className="category-card__inner_icon">&gt;</span>
            </td>
        )
    }
    else {
        return (
            <td className={classes}>
                {props.content}
                <span className="category-card__inner_icon">&gt;</span>
            </td>
        )
    }
}

export default TableCell;