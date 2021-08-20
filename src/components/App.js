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

        <div class="results">
          <div class="results__plays">
            <PlayCard />
          </div>
          <div class="results__authors">

          </div>
        </div>
    </div>
  );
}

export default App;
