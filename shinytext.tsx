import { motion, useAnimation } from "framer-motion"
import * as React from "react"

export function ShinyTextEffect(props) {
    const textArray = props.text.split("") // Rozbij tekst na pojedyncze litery

    // Funkcja do uruchamiania animacji dla każdej litery
    const startAnimation = (controls) => {
        controls.start((i) => ({
            opacity: [0.75, 1, 0.75],
            textShadow: [
                `0 0 12px ${props.glowColor}`,
                `0 0 20px ${props.glowColor}`,
                `0 0 30px ${props.glowColor}`,
                `0 0 40px ${props.glowColor}`,
            ],
            transition: {
                duration: 2.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity, // Powtarzaj animację nieskończoność razy
                delay: i * 0.05, // Opóźnienie startu animacji dla każdej litery
            },
        }))
    }

    return (
        <div
            style={{
                display: "inline-block",
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
            }}
        >
            {textArray.map((char, i) => {
                const controls = useAnimation() // Użyj hooka useAnimation dla każdej litery
                React.useEffect(() => {
                    startAnimation(controls)
                }, [controls])

                return char === " " ? (
                    <span
                        key={i}
                        style={{
                            display: "inline-block",
                            width: `${props.fontSize * 0.25}px`,
                        }}
                    >
                        &nbsp;
                    </span>
                ) : (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0.75 }}
                        animate={controls} // Przypisz kontroler animacji do właściwości animate
                        custom={i} // Przekazuje indeks jako prop do funkcji animacji
                        style={{
                            display: "inline-block",
                            color: props.textColor,
                            fontSize: `${props.fontSize}px`,
                        }}
                    >
                        {char}
                    </motion.span>
                )
            })}
        </div>
    )
}

// Domyślne wartości propsów
ShinyTextEffect.defaultProps = {
    text: "Odkryj siłę no-code już dziś!",
    textColor: "#C7C7C7",
    glowColor: "#FFFFFF",
    fontSize: 24,
}
