import { APIs } from '../APIs';

export const getCards = async () => {
      try {
        const response = await fetch(APIs.getCards);
        const data = await response.json();
        return data;
      } catch (error) {
        throw (error);
      }
};

export const getColumns = async () => {
    try {
      const response = await fetch(APIs.getColumns);
      const data = await response.json();
      return data;
    } catch (error) {
      throw (error);
    }
};

export const updateColumns = async (columns: object[]) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ columns })
        };
        fetch(APIs.updateColumns, requestOptions)
        .then(response => response.json())
        .then(data => data);
    } catch (error) {
      throw (error);
    }
};

export const addCards = async (cards: object) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cards })
        };
        fetch(APIs.addCards, requestOptions)
        .then(response => response.json())
        .then(data => data);
    } catch (error) {
      throw (error);
    }
};

export const updateCard = async (card: object) => {
  try {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card })
      };
      fetch(APIs.updateCard, requestOptions)
      .then(response => response.json())
      .then(data => data);
  } catch (error) {
    throw (error);
  }
};