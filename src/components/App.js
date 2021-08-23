import React from 'react';
import PlayCard from './PlayCard';
import arrowRight from '../images/arrowRight.svg';
import data from '../data/data.json';
import AuthorCard from './AuthorCard';

function App() {
  const [inputElement, setInputElement] = React.useState('');
  const [searchValue, setSearchValue] = React.useState(''); // значение, по которому будем искать
  const dataArray = data.result;
  const [searchMessage, setSearchMessage] = React.useState('Поиск');
  const [playsArray, setPlaysArray] = React.useState([]);
  const [authorsArray, setAuthorsArray] = React.useState([]);
  
  function handleChange(evt) {
    setSearchValue(evt.target.value.toLowerCase());
    setInputElement(evt.target.value);
  }


  function getPlays() {
    const setUpdates = [];
    dataArray.forEach(play => {
      if (play.title.toLowerCase().includes(searchValue)) {
        
        setUpdates.push(play);
      }
    })

    return setUpdates;
  }

  function getAuthors() {
    const setUpdates = [];
    const testArray = [];
    let matchedLetter = false;
    dataArray.forEach(play => {
      if (play.author_firstName.toLowerCase().includes(searchValue) || play.author_lastName.toLowerCase().includes(searchValue)) {
          
        setUpdates.push(play);
      }
    })

    if (setUpdates.length !== 0) {
      setUpdates.forEach(play => {

        testArray.forEach(newItem => {
          if (play.author_lastName.charAt(0) === newItem.letter) {
            matchedLetter = true;
          }
        })

        if (matchedLetter) {
          testArray.forEach(newItem => {
            let matchedLastName = false;
            if (play.author_lastName.charAt(0) === newItem.letter) {
              for(let i = 0; i <= newItem.author_lastName.length; i++) {
                if (newItem.author_lastName[i] === play.author_lastName) {
                  matchedLastName = true;
                }
              }

              if (!matchedLastName) {
                newItem.author_lastName.push(play.author_lastName);
                newItem.author_firstName.push(play.author_firstName);
              }
              
            }
          })
        } else {
          testArray.push({
            letter: play.author_lastName.charAt(0),
            author_lastName: [play.author_lastName],
            author_firstName: [play.author_firstName],
          })
        }
      })
    }

    testArray.sort(function (a, b) {
      if (a.letter > b.letter) {
        return 1;
      }
      if (a.letter < b.letter) {
        return -1;
      }

      return 0;
    });
    return testArray;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setInputElement('');

    if (searchValue === '') {
      return;
    }

    setPlaysArray(getPlays());
    setAuthorsArray(getAuthors());
    
    if (getPlays().length === 0 && getAuthors().length === 0) {
      setSearchMessage(`По запросу "${searchValue}" мы ничего не нашли`);
    } else {
      setSearchMessage(`По запросу "${searchValue}" мы нашли`);
    }
    
    setSearchValue('');
  }

  return (
    <div className="App">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form__result-text">{searchMessage}</p>
          <div className="form__container">
            <input className="form__input" value={inputElement} onChange={handleChange} placeholder="Введите свой запрос сюда" required></input>
            <button type="submit" className="form__button">
              <img className="form__arrow" src={arrowRight} alt="Изображение стрелки, направленной вправо, на кнопке"/>
              Искать
            </button>
          </div>
        </form>

        <div className="results">
          <div className="results__plays">
            {playsArray.length !== 0 ? playsArray.map((play) => {
              return (<PlayCard title={play.title} 
              key={play._id} 
              firstName={play.author_firstName}
              lastName={play.author_lastName}
              city={play.city}
              year={play.year} />)
            }) : []}
          </div>
          <div className="results__authors">
            {authorsArray.length !== 0 ? authorsArray.map((item) => {
              return (<AuthorCard item={item}/>)
            }) : []}
          </div>
        </div>
    </div>
  );
}

export default App;