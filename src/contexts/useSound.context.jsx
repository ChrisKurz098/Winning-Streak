import { createContext, useState, useContext, useRef, useEffect } from "react";


const soundContext = createContext();

export const SoundProvider = ({ children }) => {

    const [soundFile, setSoundFile] = useState(null);
    const [key, setKey] = useState(0);

    const playSound = (soundFileName) => {
        if (soundFileName === soundFile) {
            //by updating the key we force the audio element to remount, reinitiating the autoplay
            setKey(old => (old + 1));
        } else {
            setKey(0);
            setSoundFile(soundFileName);
        }
        return;
    };

    const stopSound = () => {
        setKey(0);
        setSoundFile(null);
        return;
    };


    return (
        <soundContext.Provider value={{ playSound, stopSound }}>
            {children}
            {
                (soundFile) ? (
                    <audio key={key} autoPlay>
                        <source src={`sounds/${soundFile}.wav`} type="audio/wav" />
                    </audio>
                )
                    : ('')
            }
        </soundContext.Provider>
    )
};

const useSound = () => {
    return useContext(soundContext)
}

export default useSound;