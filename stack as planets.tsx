import * as React from "react"
import { Frame } from "framer"

const Logo = ({ logoLink, x, y, width = 60, height = 60 }) => (
    <Frame
        width={width}
        height={height}
        background="transparent"
        style={{
            position: "absolute",
            left: x,
            top: y,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <img
            src={logoLink}
            alt="Logo"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
    </Frame>
)

const LogoOrbit = ({ radius, numLogos, logoLinks, speed }) => {
    const baseWidth = 600
    const baseHeight = 600
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, speed)
        return () => clearInterval(interval)
    }, [speed])

    const angleStep = (2 * Math.PI) / numLogos

    const calculateLogoPosition = (radius, angle) => {
        const x = baseWidth / 2 + radius * Math.cos(angle) - 30 
        const y = baseHeight / 2 + radius * Math.sin(angle) - 30
        return { x, y }
    }

    return logoLinks.map((logoLink, index) => {
        const angle = angleStep * index + time / 100
        const { x, y } = calculateLogoPosition(radius, angle)
        return <Logo key={index} logoLink={logoLink} x={x} y={y} />
    })
}

export const OuterOrbit = ({ logoLinks }) => (
    <LogoOrbit
        radius={250}
        numLogos={logoLinks.length}
        logoLinks={logoLinks}
        speed={40}
    />
)

export const InnerOrbit = ({ logoLinks }) => (
    <LogoOrbit
        radius={150}
        numLogos={logoLinks.length}
        logoLinks={logoLinks}
        speed={20}
    />
)

export function LogoCircle() {
    const logoLinksOuter = [
        "https://imgur.com/EX4X1Ua.png",
        "https://imgur.com/cZFLMtD.png",
        "https://imgur.com/3S0Qi7D.png",
        "https://imgur.com/gDfyK2H.png",
        "https://imgur.com/rcwbLss.png",
        "https://imgur.com/KpDcOgh.png",
    ]

    const logoLinksInner = [
        "https://imgur.com/HL5RsQz.png",
        "https://imgur.com/f6FVwA9.png",
        "https://imgur.com/Jw0yUwT.png",
        "https://imgur.com/aTAeesq.png",
        "https://imgur.com/lka8fYK.png",
        "https://imgur.com/4NBED9d.png",
    ]


    const centralLogoLink = "https://i.imgur.com/zl53Qw9.png"

    const centralLogoSize = 100
    const offset = centralLogoSize / 2

    return (
        <Frame
            width={600}
            height={600}
            background="transparent"
            style={{ position: "relative", overflow: "visible" }}
        >
            <Logo
                logoLink={centralLogoLink}
                x={300 - offset}
                y={300 - offset}
                width={centralLogoSize}
                height={centralLogoSize}
            />
            <OuterOrbit logoLinks={logoLinksOuter} />
            <InnerOrbit logoLinks={logoLinksInner} />
        </Frame>
    )
}
