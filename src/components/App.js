import React from 'react';
import PlayCard from './PlayCard';
import arrowRight from '../images/arrowRight.svg';
import data from '../data.json';

function App() {
  const [inputElement, setInputElement] = React.useState('');
  const [searchValue, setSearchValue] = React.useState(''); // значение, по которому будем искать
  const [dataArray, setDataArray] = React.useState(data.result);
  const [searchMessage, setSearchMessage] = React.useState('Поиск');
  const [playsArray, setPlaysArray] = React.useState([]);

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

  function handleSubmit(evt) {
    evt.preventDefault();
    setInputElement('');

    if (searchValue === '') {
      return;
    }

    setPlaysArray(getPlays());
    
    if (getPlays().length === 0) {
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
              year={play.year}/>)
            }) : []}
          </div>
          <div className="results__authors">

          </div>
        </div>
    </div>
  );
}

export default App;
