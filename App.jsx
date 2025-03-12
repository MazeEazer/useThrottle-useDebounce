
import React, { useState } from "react"
import useThrottle from "./assets/useThrottle"
import useDebounce from "./assets/useDebounce"

function App() {
  const [inputValue, setInputValue] = useState("")
  const throttledValue = useThrottle(inputValue, 1000) // Задержка 1000 мс
  const debouncedValue = useDebounce(inputValue, 500) // Задержка 500 мс

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите текст"
      />
            <p>Текст с debounce: {debouncedValue}</p>

      <p>Текст без задержки: {inputValue}</p>
      <p>Текст с throttle: {throttledValue}</p>
    </div>
  )
}
export default App
