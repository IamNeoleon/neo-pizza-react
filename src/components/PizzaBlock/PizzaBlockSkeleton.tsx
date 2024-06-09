import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="125" cy="125" r="120" />
        <rect x="0" y="274" rx="10" ry="10" width="280" height="24" />
        <rect x="-1" y="312" rx="10" ry="10" width="280" height="84" />
        <rect x="0" y="420" rx="10" ry="10" width="90" height="20" />
        <rect x="128" y="415" rx="10" ry="10" width="150" height="30" />
    </ContentLoader>
)

export default MyLoader

