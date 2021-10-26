import { useState } from 'react';

const useOpen = () => {
    const [addCtgOpen, setAddCtgOpen] = useState<boolean>(false);

    const handleAddCtg = () => {
        setAddCtgOpen(!addCtgOpen);
    }

    return { addCtgOpen, handleAddCtg }
}

export default useOpen;