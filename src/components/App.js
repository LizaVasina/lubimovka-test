// import './App.css';
import React from 'react';
import PlayCard from './PlayCard';
import arrowRight from '../images/arrowRight.svg';

function App() {
  return (
    <div className="App">
        <form className="form">
          <p className="form__result-text">Поиск</p>
          <div className="form__container">
            <input className="form__input" placeholder="Введите свой запрос сюда"></input>
            <button type="submit" className="form__button">
              <img className="form__arrow" src={arrowRight} alt="Изображение стрелки, направленной вправо, на кнопке"/>
              Искать
            </button>
          </div>
        </form>

        <div className="results">
          <div className="results__plays">
            <PlayCard
              title="Август 1999 или Никита, любовь и голуби"
              lastName="Бжожовский"
              firstName="Теодор"
              city="Санкт-Петербург"
              year="2020" />
            <PlayCard 
              title="Августина и Степан"
              lastName="Пастернак"
              firstName="Ангелина"
              city="Санкт-Петербург"
              year="2020"/>
            <PlayCard 
              title="По ту сторону августа"
              lastName="Евдокимов"
              firstName="Платон"
              city="Москва"
              year="2017"/>
          </div>
          <div className="results__authors">

          </div>
        </div>
    </div>
  );
}

export default App;
