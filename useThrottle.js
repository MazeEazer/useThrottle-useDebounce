import { useState, useEffect, useRef } from "react"

function useThrottle(value, delay = 1000) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastTime = useRef(Date.now()) //  Время последнего обновления
  const timeoutRef = useRef(null) // Переменная Для хранения таймера, чтоб очистить

  useEffect(() => {
    if (Date.now() - lastTime.current >= delay) {
      //Если больше прошло чем задержка то устанавливаем значение
      setThrottledValue(value)
      lastTime.current = Date.now()
    } else {
      // Иначе ставим таймер на оставшееся время
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current) // Очищаем предыдущий таймер
      }
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value) // Обновляем значение после задержки
        lastTime.current = Date.now()  // Запоминаем время обновления
      }, delay - (Date.now() - lastTime.current)) // Оставшееся время 1000 - (1200 - 300)) = 100ms
    }
    return () => clearTimeout(timeoutRef.current)
  }, [value, delay])

  return throttledValue
}
export default useThrottle
