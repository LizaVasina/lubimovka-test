import React from 'react';

function AuthorCard(props) {
    const names = [{
        author_firstName: "Лиза",
        author_lastName: "Васина",
    },
    {
        author_firstName: "Лизуся",
        author_lastName: "Васина",
    },
    {
        author_firstName: "Лизя",
        author_lastName: "Васина",
    }];

    return (
        <div className="authors">
            <h2 className="authors__letter">{props.item.author_lastName.length !== 0 ? props.item.letter : ''}</h2>
            { props.item.author_lastName.length !== 0 ? props.item.author_lastName.map((lastName, i) => {
            return (
            <p className="authors__name">{props.item.author_lastName[i]} {props.item.author_firstName[i]}</p>
            )
            }) : []}
        </div>
        )    
};

export default AuthorCard;