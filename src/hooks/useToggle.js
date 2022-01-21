import { useState } from "react";

// custom hook
// return piece of state AND a function to toggle it

/** With this hook u can directly toogle Boolean state */
function useToggle(initValue = false){
    const [state, setState] = useState(initValue)
    const toggle = ()=> setState(!state)

    return [state, toggle]
}

export default useToggle