import { SelectI } from "../../Interfaces/SelectI";
import { useInvoiceContext } from "./useInvoiceContext";
type UseInvoiceContextType = ReturnType<typeof useInvoiceContext>;

export const initInvoiceContextState: UseInvoiceContextType = {
  handleResetRecords: () => {},
  error: null,
  pending: false,
  answer: null,
  formState: "create",
  dateState: new Date(),
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
  submit: async (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    return Promise.resolve();
  },
  handleChangeCategory: (
    _item: SelectI,
    _items: SelectI[] | null,
    _categories: SelectI[] | null,
    _setDisplayedItems: (value: React.SetStateAction<SelectI[] | null>) => void,
    setDisplayedCategories: (
      value: React.SetStateAction<SelectI[] | null>
    ) => void
  ) => {},
  defaultCategory: null,
  handleChangeItem: (
    item: SelectI,
    items: SelectI[] | null,
    categories: SelectI[] | null
  ) => {},
  defaultItem: null,
  submitChanges: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    return Promise.resolve();
  },
  setFormState: () => {},
  getReg: (name: string) => null,
  getError: (name: string) => undefined,
  handleEdit: (id: number) => {},
  handleSave: () => {},
  handleDelete: (id: number) => {},
  tableData: undefined,
};
