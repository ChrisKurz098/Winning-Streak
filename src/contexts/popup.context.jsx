import { createContext, useContext, useState } from "react"
import PopUpMenu from "../components/PopUpMenu/PopUpMenu.component"

const PopupMenuContext = createContext()

export const PopupMenuContextProvider = ({ children }) => {

  const [state, setState] = useState({ message: '', answesrs: [], onConfirm: null, onCancel: null, isOpen: false, resolve: null })

  const createPopup = async (data) => {
    return new Promise(resolve => {
      setState({ ...data, isOpen: true, resolve: resolve });
    });

  }

  const closePopup = () => {
    //reset the state
    setState({ message: '', answesrs: [], onConfirm: null, onCancel: null, isOpen: false });
  }

  return (
    <PopupMenuContext.Provider value={{ createPopup, closePopup }}>
      {children}
      <PopUpMenu {...state} />
    </PopupMenuContext.Provider>
  )
}


const usePopup = () => {
  return useContext(PopupMenuContext)
}

export default usePopup;