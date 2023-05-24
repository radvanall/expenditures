import { SelectI } from "../../Interfaces/SelectI";

export const enum TYPE {
  MOVE_DOWN,
  MOVE_UP,
  RESET,
  SET_VALUE,
}

export type ReducerAction = {
  type: TYPE;
  payload?: SelectI;
};
export const initState = {
  selected: 0,
  value: {
    id: null,
    name: "",
    links: null,
  } as SelectI,
};
export const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case TYPE.MOVE_UP: {
      return { ...state, selected: state.selected - 1 };
    }
    case TYPE.MOVE_DOWN: {
      return { ...state, selected: state.selected + 1 };
    }
    case TYPE.SET_VALUE: {
      return { ...state, value: action?.payload as SelectI };
    }
    case TYPE.RESET: {
      return { ...state, selected: 0 };
    }
    default:
      throw new Error();
  }
};
