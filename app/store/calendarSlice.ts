// calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  selectedDate: string | null; 
  selectedData: any[] | null;
  showPopup: boolean;
}

const initialState: CalendarState = {
  selectedDate: null,
  selectedData: null,
  showPopup: false,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedData: (state, action: PayloadAction<any[] | null>) => {
      state.selectedData = action.payload;
    },
    setShowPopup: (state, action: PayloadAction<boolean>) => {
      state.showPopup = action.payload;
    },
  },
});

export const { setSelectedDate, setSelectedData, setShowPopup } = calendarSlice.actions;
export default calendarSlice.reducer;
