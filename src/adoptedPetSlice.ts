// eslint-disable-next-line import/named
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pet } from "./types";

interface AdoptedPetState {
  value: Pet | null;
}

const initialState: AdoptedPetState = {
  value: null,
};

// Workaround: cast state instead of declaring variable type
// const initialState = {
//   value: 0,
// } as CounterState

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState,
  reducers: {
    adopt: (state, action: PayloadAction<Pet>) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
