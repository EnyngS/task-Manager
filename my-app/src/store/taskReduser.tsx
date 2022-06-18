import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CurentBoard } from './type/taskReduser';
import axios from 'axios';

const initialState = {
  boardID: '',
  columns: null,
  taskModal: false,
  tasks: [
    {
      id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
      title: 'Task: pet the cat',
      done: false,
      order: 1,
      description: 'Domestic cat needs to be stroked gently',
      userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
      boardId: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
      columnId: '41344d09-b995-451f-93dc-2f17ae13a4a9',
      files: [
        {
          filename: 'foto.jpg',
          fileSize: 6105000,
        },
      ],
    },
  ],
};

export const getAllCell = createAsyncThunk('taskReduser/getAllCell', async function () {
  let userJ: any = localStorage.getItem('rsApp');
  let user: any = JSON.parse(userJ);
  let BoardID: any = localStorage.getItem('BoardID');
  const response = await fetch(
    `https://quiet-bastion-49623.herokuapp.com/boards/${BoardID}/columns`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.ok) {
    const data: any = await response.json();
    return data;
  } else {
    return null;
  }
});

export const createCell = createAsyncThunk('taskReduser/createCell', async function (props: any) {
  let userJ: any = localStorage.getItem('rsApp');
  let user: any = JSON.parse(userJ);
  await axios({
    method: 'POST',
    headers: { Authorization: `Bearer ${user.token}` },
    data: {
      title: props.title,
      order: +props.order,
    },
    url: `https://quiet-bastion-49623.herokuapp.com/boards/${props.boardID}/columns`,
  });
});

export const deleteColumn = createAsyncThunk(
  'taskReduser/deleteColumn',
  async function (id: string | undefined) {
    let userJ: any = localStorage.getItem('rsApp');
    let user: any = JSON.parse(userJ);
    let BoardID: any = localStorage.getItem('BoardID');

    const response = await fetch(
      `https://quiet-bastion-49623.herokuapp.com/boards/${BoardID}/columns/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  }
);

export const getAllTask = createAsyncThunk('taskReduser/getAllTask', async function (props: any) {
  let userJ: any = localStorage.getItem('rsApp');
  let user: any = JSON.parse(userJ);
  let BoardID: any = localStorage.getItem('BoardID');
  let ColumnID: any = localStorage.getItem('ColumnID');
  const response = await fetch(
    `https://quiet-bastion-49623.herokuapp.com/boards/${BoardID}/columns/${props}/tasks`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.ok) {
    const data: any = await response.json();
    return data;
  } else {
    return null;
  }
});

export const createTask = createAsyncThunk('taskReduser/createTask', async function (props: any) {
  let userJ: any = localStorage.getItem('rsApp');
  let user: any = JSON.parse(userJ);
  let BoardID: any = localStorage.getItem('BoardID');
  let ColumnID: any = localStorage.getItem('ColumnID');

  await axios({
    method: 'POST',
    headers: { Authorization: `Bearer ${user.token}` },
    data: {
      title: props.title,
      done: false,
      order: props.order,
      description: props.description,
      userId: user.id,
    },

    url: `https://quiet-bastion-49623.herokuapp.com/boards/${BoardID}/columns/${props.columnId}/tasks`,
  });
});

export const deleteTask = createAsyncThunk('taskReduser/deleteTask', async function (props: any) {
  let userJ: any = localStorage.getItem('rsApp');
  let user: any = JSON.parse(userJ);
  let BoardID: any = localStorage.getItem('BoardID');

  const response = await fetch(
    `https://quiet-bastion-49623.herokuapp.com/boards/${BoardID}/columns/${props.Cid}/tasks/${props.Tid}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
});

const taskReduser = createSlice({
  name: 'taskReduser',
  initialState,
  reducers: {
    setBoardID: (state, action) => {
      state.boardID = action.payload;
    },
    setTaskModal: (state, action) => {
      state.taskModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCell.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { setBoardID, setTaskModal } = taskReduser.actions;
export default taskReduser.reducer;
