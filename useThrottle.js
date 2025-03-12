import { useState, useEffect, useRef } from "react"

function useThrottle(value, delay = 1000) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastTime = useRef(Date.now()) // Время последнего обновления
  const timeoutRef = useRef(null) // Для хранения таймера

  useEffect(() => {
    if (Date.now() - lastTime.current >= delay) {
      setThrottledValue(value)
      lastTime.current = Date.now()
    } else {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value)
        lastTime.current = Date.now()
      }, delay - (Date.now() - lastTime.current)) // 1000 - (1200 - 300)) = 100ms
    }
    return () => clearTimeout(timeoutRef.current)
  }, [value, delay])

  return throttledValue
}
export default useThrottle
