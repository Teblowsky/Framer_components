import React, { useEffect, useState } from "react"

export default function WelcomeTypewriter() {
    const fullText = "What if you could hire your own AI assistant?"
    const [text, setText] = useState("")
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        if (isTyping && text.length < fullText.length) {
            const timeoutId = setTimeout(() => {
                setText(fullText.substring(0, text.length + 1))
            }, 60) // Typing speed

            return () => clearTimeout(timeoutId)
        } else if (text.length === fullText.length) {
            setIsTyping(false)
        }
    }, [text, isTyping])

    return (
        <div style={containerStyle}>
            {text}
            <span className="cursor">|</span>
            <style>
                {`
          @keyframes blink-animation {
            50% {
              opacity: 0;
            }
          }
          .cursor {
            animation: blink-animation 1s infinite;
          }
        `}
            </style>
        </div>
    )
}

const containerStyle = {
    fontSize: "40px",
    fontFamily: "Raleway, sans-serif",
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: "-2px",
    lineHeight: "1.2",
    textAlign: "center",
}
