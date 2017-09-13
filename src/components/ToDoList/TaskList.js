import React from 'react';

import './style/tasklist.css';

export const List = ({ list }) => {
    return (
        <div className="list">
            <ul>
                {list.map((elem, indx) =>
                    <li key={indx}>
                        {elem}
                    </li>
                )}
            </ul>
        </div>
    )
}