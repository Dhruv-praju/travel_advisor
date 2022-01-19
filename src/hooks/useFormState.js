import { useState } from "react";

function useFormState(initValue=''){
   const [value, setValue] = useState(initValue)
   const change = (e)=> setValue(e.target.value) 
   const reset = ()=> setValue('')

   return [value, change, reset]
}

export default useFormState