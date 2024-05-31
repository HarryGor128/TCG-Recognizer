import { Dispatch, SetStateAction, createContext } from 'react';

export type PopupCardListContextType = {
    targetCardList: string[];
    setTargetCardList: Dispatch<SetStateAction<string[]>>;
};

const defaultPopupCardListContext: PopupCardListContextType = {
    targetCardList: [],
    setTargetCardList: () => {},
};

const PopupCardListContext = createContext(defaultPopupCardListContext);

export default PopupCardListContext;
