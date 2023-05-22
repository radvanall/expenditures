import { SelectI } from "../../Interfaces/SelectI";
interface RecordI {
  [index: string]: string | number;
  id: number;
  category_id: number;
  category_name: string;
  item_id: number;
  item_name: string;
  price: number;
  quantity: number;
  unit: string;
}
type payloadType =
  | number
  | Date
  | null
  | SelectI
  | RecordI
  | RecordI[]
  | { id: number; data: RecordI };
export const enum TYPE {
  SET_FORM_TO_EDIT,
  SET_FORM_TO_CREATE,
  SET_DATE_STATE,
  UPDATE_RECORD,
  DELETE_RECORD,
  SUBMIT_RECORD,
  INCREASE_RECORD_ID,
  SET_EDITED_RECORD_ID,
  SET_DEFAULT_CATEGORY,
  SET_DEFAULT_ITEM,
  RESET_RECORDS,
}
export type ReducerAction = {
  type: TYPE;
  payload?: payloadType;
};
type initStateType = {
  formState: string;
  dateState: Date | null;
  records: null | RecordI[];
  recordsId: number;
  editRecordId: number;
  defaultCategory: SelectI | null;
  defaultItem: SelectI | null;
};
export const initState: initStateType = {
  formState: "create",
  dateState: new Date(),
  records: null,
  recordsId: 0,
  editRecordId: -1,
  defaultCategory: null,
  defaultItem: null,
};
export const invoiceReducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case TYPE.SET_FORM_TO_EDIT:
      return { ...state, formState: "edit" };
    case TYPE.SET_FORM_TO_CREATE:
      return { ...state, formState: "create" };
    case TYPE.SET_DATE_STATE:
      return { ...state, dateState: (action?.payload ?? new Date()) as Date };
    case TYPE.UPDATE_RECORD: {
      const updatedRecords = (prevRecords: RecordI[] | null) => {
        if (prevRecords === null) return null;
        const updatedRecord = prevRecords?.map((item) => {
          if (item.id === state.editRecordId) {
            return { ...item, ...(action.payload as RecordI) };
          }
          return item;
        });
        return updatedRecord;
      };
      return {
        ...state,
        records: updatedRecords(state.records),
      };
    }
    case TYPE.DELETE_RECORD: {
      const id = action?.payload;
      const deleteRecords = (prevRecords: RecordI[] | null) => {
        if (!prevRecords) return null;
        const updateRecords = prevRecords?.filter((item) => item.id !== id);
        return updateRecords;
      };
      return { ...state, records: deleteRecords(state.records) };
    }
    case TYPE.SUBMIT_RECORD: {
      const data = action?.payload as RecordI;
      const submitRecord = (data: RecordI, records: RecordI[] | null) => {
        if (records === null) {
          return [data];
        }
        if (records === undefined) return null;
        const sameItem = records?.find(
          (record) =>
            record.item_id === Number(data.item_id) &&
            record.price === Number(data.price)
        );
        if (sameItem) {
          const updatedSameItem = {
            ...sameItem,
            quantity: sameItem.quantity + Number(data.quantity),
          };
          const updatedRecords = records?.map((record) =>
            record.item_id === sameItem.item_id &&
            record.price === sameItem.price
              ? updatedSameItem
              : record
          );
          return updatedRecords as RecordI[];
        }
        return [...(records as RecordI[]), data as RecordI];
      };

      return { ...state, records: submitRecord(data, state.records) };
    }
    case TYPE.INCREASE_RECORD_ID: {
      return { ...state, recordsId: state.recordsId + 1 };
    }
    case TYPE.SET_EDITED_RECORD_ID: {
      return { ...state, editRecordId: (action?.payload ?? -1) as number };
    }
    case TYPE.SET_DEFAULT_CATEGORY: {
      const { id, name, links } = (action?.payload as SelectI) || {
        id: null,
        unit: "",
        name: "",
        links: null,
      };
      return {
        ...state,
        defaultCategory: { id: id ?? -1, name: name, links: links },
      };
    }
    case TYPE.SET_DEFAULT_ITEM: {
      const { id, name, unit, links } = (action?.payload as SelectI) || {
        id: null,
        unit: "",
        name: "",
        links: null,
      };
      return {
        ...state,
        defaultItem: { id: id ?? -1, name: name, links: links, unit: unit },
      };
    }
    case TYPE.RESET_RECORDS: {
      return {
        ...state,
        recordsId: 0,
        records: null,
      };
    }
    default:
      throw new Error();
  }
};
