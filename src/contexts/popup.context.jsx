import { createContext, useContext, useState } from "react"
import PopUpMenu from "../components/PopUpMenu/PopUpMenu.component"

const PopupMenuContext = createContext()

export function PopupMenuContextProvider({ children }) {

  const [state, setState] = useState({  message: '', answesrs: ['Yes', 'No'], onConfirm: null, onCancel: null, isOpen: false })

  const createPopup = (data) => {
    setState({ ...data, isOpen: true })
  }

  const closePopup = () => {
    setState(old => ({...old, isOpen: false}))
  }
  
  return (
    <PopupMenuContext.Provider value={{createPopup, closePopup}}>
      {children}
     <PopUpMenu {...state} />
    </PopupMenuContext.Provider>
  )
}


export default function usePopup() {
  return useContext(PopupMenuContext)
}