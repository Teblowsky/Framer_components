import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

export default function HolographicInterface(props) {
    const { backgroundColor, rotateSpeed, imageUrl } = props
    const initialRotation = { rotateY: -20, rotateX: 0 }
    const [rotation, setRotation] = useState(initialRotation)

    const updateTime = () => {
        const now = new Date()
        return now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        })
    }
    const [currentTime, setCurrentTime] = useState(updateTime())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(updateTime())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event
        const { innerWidth, innerHeight } = window
        const rotateY = (clientX / innerWidth) * 90 - 45
        const rotateX = -(clientY / innerHeight) * 90 + 45
        setRotation({ rotateY, rotateX })
    }

    const handleMouseLeave = () => {
        setRotation(initialRotation)
    }

    const styles = {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            perspective: 1000,
            backgroundColor,
        },
        card: {
            width: "80%",
            height: "90%",
            position: "relative",
            borderRadius: "15px",
            background: "transparent",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
                "0 0 15px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.6) inset",
        },
        statusBar: {
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#FFF",
            padding: "0 10px",
            fontSize: "14px",
            zIndex: 2,
        },
        clock: {
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#FFF",
            fontSize: "45px",
            zIndex: 2,
        },
        notification: {
            position: "absolute",
            bottom: "50%",
            left: "10%",
            backgroundColor: "rgba(255,255,255,0.5)",
            padding: "10px",
            borderRadius: "10px",
            color: "#000",
            fontSize: "15px",
            maxWidth: "80%",
            zIndex: 2,
        },
        graphic: {
            width: "100%",
            height: "100%",
            borderRadius: "15px",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
        },
    }

    return (
        <div
            style={styles.container}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={styles.card}
                animate={rotation}
                transition={{ duration: rotateSpeed, ease: "linear" }}
            >
                <div style={styles.statusBar}>
                    <div>Prototypers</div>
                    <div>📶 🔋</div>
                </div>
                <div style={styles.clock}>{currentTime}</div>
                <div style={styles.notification}>
                    ✉️ <strong>Prototypers:</strong> Twój projekt jest gotowy!
                </div>
                <img
                    src={imageUrl}
                    alt="Holographic Display Content"
                    style={styles.graphic}
                />
            </motion.div>
        </div>
    )
}

addPropertyControls(HolographicInterface, {
    backgroundColor: {
        title: "Background Color",
        type: ControlType.Color,
        defaultValue: "#000000",
    },
    rotateSpeed: {
        title: "Rotate Speed",
        type: ControlType.Number,
        defaultValue: 1,
        min: 1,
        max: 20,
        step: 1,
    },
    imageUrl: {
        title: "Image URL",
        type: ControlType.String,
        defaultValue: "https://i.imgur.com/WnvbTLW.jpeg",
    },
})
