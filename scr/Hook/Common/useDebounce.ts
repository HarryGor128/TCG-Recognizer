import { useRef } from 'react';

const useDebounce = (debounceTime: number = 1000) => {
    const busy = useRef(false);

    const debounce = async (callback: () => void) => {
        setTimeout(() => {
            busy.current = false;
        }, debounceTime);

        if (!busy.current) {
            busy.current = true;
            callback();
        }
    };

    return { debounce };
};

export default useDebounce;
