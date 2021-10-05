import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { history } from "../configureStore";

const ADD_SCHEDULE = "ADD_SCHEDULE";
const UPADTE_SCHEDULE = "UPADTE_SCHEDULE";
const GET_SCHEDULES = "GET_SCHEDULES";
const REMOVE_SCHEDULE = "REMOVE_SCHEDULE";

const initialState = {
  schedules: [
    // {
    //   title: "무야호03 1시",
    //   date: "2021-10-03T13:01:00",
    //   finished: false,
    // },
    // {
    //   title: "무야호03 11시",
    //   date: "2021-10-03T11:05:00",
    //   finished: false,
    // },
    // {
    //   title: "무야호11 11시",
    //   date: "2021-10-11T11:05:00",
    //   finished: true,
    // },
    // {
    //   title: "무야호 9월22일 15시",
    //   date: "2021-09-22T15:01:00",
    //   finished: false,
    // },
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

export const addScheduleFB = (list) => {
  return async function (dispatch) {
    await addDoc(collection(db, "schedules"), list);
    // dispatch(getSchedule(list))
    alert("일정이 등록되었습니다!");
    history.replace("/");
  };
};

export const getScheduleFB = () => {
  return async function (dispatch) {
    const scheduleDB = await getDocs(collection(db, "schedules"));
    const list = [];

    scheduleDB.forEach((b) => {
      // 콘솔로 확인해요!
      list.push({ id: b.id, ...b.data() });
    });
    console.log(list);
    dispatch(getSchedule(list));
  };
};

export const removeScheduleFB = (schedule) => {
  return async function (dispatch) {
    console.log(schedule);
    await deleteDoc(doc(db, "schedules", schedule));
    dispatch(removeSchedule(schedule));
  };
};

export const updateScheduleFB = (schedule) => {
  return async function (dispatch) {
    await updateDoc(doc(db, "schedules", schedule), {
      finished: true,
    });
    dispatch(updateSchedule(schedule));
  };
};

export default handleActions(
  {
    [GET_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
        draft.schedules.push(...action.payload.schedules);

        draft.schedules = draft.schedules.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
      }),
    [ADD_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        // draft.schedules.unshift(action.payload.schedule);
      }),
    [UPADTE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const updatedSchedule = [];
        state.schedules.forEach((v) => {
          if (v.id !== action.payload.sid) {
            console.log(v.id, action.payload.sid);
            updatedSchedule.push(v);
            console.log("넣기", v);
            return;
          }
          updatedSchedule.push({ ...v, finished: true });
          console.log("수정넣기", v);
          return;
        });
        draft.schedules = updatedSchedule;
        console.log("updatedSchedule");
        console.log(updatedSchedule);
      }),
    [REMOVE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const updatedSchedule = state.schedules.filter((v) => {
          if (v.id !== action.payload.schedule) {
            return true;
          }
          return false;
        });
        draft.schedules = updatedSchedule;
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
