import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: "Nguyễn Văn A",
  birthDay: "13/01/2002",
  identity: "215452156",
  sex: "Name ",
  phone: "0392619013",
  address: "Linh Trung Precinct, Thu Duc District, Ho Chi Minh City"
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = {};
    },
  },
});

export const {addUser, removeUser} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
