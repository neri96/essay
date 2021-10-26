import { useEffect, useRef } from 'react';
// action: 'open' | 'close' | null
const useClickOutside = (handleOptionVis: (action: any) => void) => {
    const ref = useRef<any>(null);

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            handleOptionVis('close');
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    })

    return { ref }
}

export default useClickOutside;