import { useEffect } from "react";
import { Keyboard } from "react-native";


/**
 * Устанавливает прослушиватели событий клавиатуры для определения ее отображения и скрытия.
 * @function
 * @name useKeyboardListeners
 * @param {Object} options - Опции хука.
 * @param {Function} options.setKeyboardOpen - Функция для установки состояния отображения клавиатуры.
 * @returns {void}
 */
const useKeyboardListeners = (setKeyboardOpen: (state: boolean) => void) => {
    useEffect(() => {

        // Добавляем прослушиватель события показа клавиатуры
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
        // Добавляем прослушиватель события скрытия клавиатуры
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

        // Удаляем прослушиватели событий при размонтировании компонента
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [setKeyboardOpen]);
};

export { useKeyboardListeners };
