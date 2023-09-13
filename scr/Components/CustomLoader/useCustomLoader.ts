import { useState } from 'react';

const useCustomLoader = () => {
    const [IsLoading, setIsLoading] = useState(false);
    const [LoaderText, setLoaderText] = useState('');

    return {
        IsLoading,
        LoaderText,
        setIsLoading,
        setLoaderText,
    };
};

export default useCustomLoader;
