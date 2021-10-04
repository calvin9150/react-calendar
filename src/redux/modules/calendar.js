import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const ADD_SCHEDULE = "ADD_SCHEDULE";
const UPADTE_SCHEDULE = "UPADTE_SCHEDULE";
const GET_SCHEDULES = "GET_SCHEDULES";
const REMOVE_SCHEDULE = "REMOVE_SCHEDULE";

const initialState = {
  schedules: [
    {
      title: "무야호03 1시",
      date: "2021-10-03T13:01:00",
      finished: false,
    },
    {
      title: "무야호03 11시",
      date: "2021-10-03T11:05:00",
      finished: false,
    },
    {
      title: "무야호11 11시",
      date: "2021-10-11T11:05:00",
      finished: true,
    },
    {
      title: "무야호 9월22일 15시",
      date: "2021-09-22T15:01:00",
      finished: false,
    },
  ],
  is_loaded: false,
};

const addSchedule = createAction(ADD_SCHEDULE, (schedule) => ({ schedule }));
const updateSchedule = createAction(UPADTE_SCHEDULE, (sid, schedule) => ({
  sid,
  schedule,
}));
const getSchedule = createAction(GET_SCHEDULES, (schedules) => ({ schedules }));
const removeSchedule = createAction(REMOVE_SCHEDULE, (schedule) => ({
  schedule,
}));

export default handleActions(
  {
    [GET_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
        draft.schedules.push(...action.payload.schedules);
      }),
    [ADD_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.schedules.unshift(action.payload.schedule);
      }),
    [UPADTE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [REMOVE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const updatedSchedule = state.schedule.filter((v) => {
          if (
            v.date !== action.schedule.date &&
            v.time !== action.schedule.time
          ) {
            return true;
          }
          return false;
        });
        draft.schedules = [updatedSchedule];
      }),
  },
  initialState
);

const actionCreators = {
  addSchedule,
  updateSchedule,
  getSchedule,
  removeSchedule,
};

export { actionCreators };
