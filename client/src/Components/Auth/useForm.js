import {useState} from 'react';
///[name,address
export const useForm=()=>{
    const[state,setState]=useState({
        name:'',
        phone:'',
        password:'',
        district:'',
        blood:'',
        message:'',
        hospitalName:'',
        travel:false

    })
    const handleChange=e=>{
        setState((state)=>({...state,[e.target.name]:e.target.value}))
    }
    const handleChangeManual=(name,value)=>{
        setState((state)=>({...state,[name]:value}))
    }

    return [state,handleChange,handleChangeManual]
}

