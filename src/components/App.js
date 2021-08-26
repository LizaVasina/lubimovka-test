import React from 'react';
import PlayCard from './PlayCard';
import arrowRight from '../images/arrowRight.svg';
import data from '../data/data.json';
import AuthorCard from './AuthorCard';

function App() {
  const [inputElement, setInputElement] = React.useState(''); // значение для обнуления инпута
  const [searchValue, setSearchValue] = React.useState(''); // значение, по которому будем искать
  const dataArray = data.result; // данные
  const [searchMessage, setSearchMessage] = React.useState('Поиск'); // сообщение для заголовка страницы
  const [playsArray, setPlaysArray] = React.useState([]); // массив найденных пьес
  const [authorsArray, setAuthorsArray] = React.useState([]); // массив найденных авторов
  
  function handleChange(evt) { // запоминаем поисковое значение по мере записи в инпут
    setSearchValue(evt.target.value.toLowerCase());
    setInputElement(evt.target.value);
  }


  function getPlays() { // получаем массив пьес
    const setUpdates = [];
    dataArray.forEach(play => {
      if (play.title.toLowerCase().includes(searchValue)) {
        
        setUpdates.push(play);
      }
    })

    return setUpdates;
  }

  function getAuthors() { // получаем массив авторов
    const setUpdates = [];
    const testArray = [];
    let matchedLetter = false;
    dataArray.forEach(play => { // ищем авторов по поисковому слову
      if (play.author_firstName.toLowerCase().includes(searchValue) || play.author_lastName.toLowerCase().includes(searchValue)) {
          
        setUpdates.push(play);
      }
    })

    if (setUpdates.length !== 0) {
      setUpdates.forEach(play => {

        testArray.forEach(newItem => { // если нашли совпадение по заглавной букве, то отмечаем это
          if (play.author_lastName.charAt(0) === newItem.letter) {
            matchedLetter = true;
          }
        })

        if (matchedLetter) {
          testArray.forEach(newItem => { // если такая заглавная буква есть, то новую не создаем, добавляем в ее поля автора
            let matchedLastName = false;
            if (play.author_lastName.charAt(0) === newItem.letter) { // отмечаем, если в массиве уже есть такой автор
              for(let i = 0; i <= newItem.author_lastName.length; i++) {
                if (newItem.author_lastName[i] === play.author_lastName) {
                  matchedLastName = true;
                }
              }

              if (!matchedLastName) { // если автора нет, то добавляем его в массив
                newItem.author_lastName.push(play.author_lastName);
                newItem.author_firstName.push(play.author_firstName);
              }
              
            }
          })
        } else { // если такой заглавной буквы еще нет, то добавляем букву и автора в соответствующие поля
          testArray.push({
            letter: play.author_lastName.charAt(0), // структура элемента массива: заглавная буква
            author_lastName: [play.author_lastName], // массив с фамилиями авторов
            author_firstName: [play.author_firstName], // массив с именами авторов
          })
        }
      })
    }

    testArray.sort(function (a, b) { // сортируем массив по алфавиту по свойству letter
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

  function handleSubmit(evt) { // обработка сабмита формы
    evt.preventDefault();
    setInputElement(''); // обнуляем инпут

    if (searchValue === '') { // если поискового слова нет, то не выполняем функцию
      return;
    }

    // получаем данные на основе поискового слова
    setPlaysArray(getPlays());
    setAuthorsArray(getAuthors());
    
    if (getPlays().length === 0 && getAuthors().length === 0) { // если оба массива пустые, то выводим "ничего не нашли"
      setSearchMessage(`По запросу "${searchValue}" мы ничего не нашли`);
    } else {
      setSearchMessage(`По запросу "${searchValue}" мы нашли`);
    }
    
    setSearchValue(''); // обнуляем поисковое слово в конце обработки формы
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