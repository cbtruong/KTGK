import React, { createContext, useState } from 'react'


/// using context save user
const ThemeContext=createContext();
const ThemeProvider = ({children}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');

    const toggleTheme=()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    const handleInputPass=(text)=>
    {
        setPass(text)
    }
    const handleInputEmail=(text)=>
        {
            setEmail(text)
        }
    const value={
        name,
        email,
        pass,
        handleInputEmail,
        handleInputPass
    }
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext,ThemeProvider}