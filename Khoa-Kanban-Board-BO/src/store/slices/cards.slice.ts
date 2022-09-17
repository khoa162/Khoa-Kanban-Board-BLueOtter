import { createSlice } from "@reduxjs/toolkit";

// import mockCards from "../../data/cards";
import ICard from "../../interfaces/ICard";
// import ICategory from "../../interfaces/ICategory";

interface CardsSliceState {
  cards: ICard[],
  searchText: string
}

const initialState: CardsSliceState = {
  // cards: mockCards,
  cards: [],
  searchText: ''
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      // state.cards = action.payload
      // console.log('setCards >>>',action.payload);
      state.cards = action.payload.cards;
    },
    // setSearchText: (state, action) => {
    //   state.searchText = action.payload
    // },
    addCard: (state, action) => {
      const card = action.payload

      state.cards = [...state.cards, card]
    },
    updateOneCard: (state, action) => {
      const cardId = action.payload.id;

      const updatedCards = state.cards.map(card => {
        if (card.id === cardId) return action.payload;
        else return card;
      })

      state.cards = updatedCards;
    },
  }
})

export const { setCards, updateOneCard,  addCard } = cardsSlice.actions; //filterCards, clearFilters,

export default cardsSlice.reducer;