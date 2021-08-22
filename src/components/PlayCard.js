import React from 'react';

function PlayCard(props) {
    return (
        <div className="playcard">
            <div className ="playcard__cover">
                <p className="playcard__title">
                    {props.title}
                </p>
            </div>
            <div className="playcard__text">
                <p className="playcard__author-name playcard__author-name_last">{props.lastName}</p>
                <p className="playcard__author-name playcard__author-name_first">{props.firstName}</p>
                <p className="playcard__info playcard__info_city">{props.city}</p>
                <p className="playcard__info playcard__info_year">{props.year}</p>
            </div>
        </div>
    )
};

export default PlayCard;