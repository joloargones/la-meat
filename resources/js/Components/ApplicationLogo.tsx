import { ImgHTMLAttributes } from "react";

export default function ApplicationLogo(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return <img src="/LAMEAT.webp" alt="LA Meat logo" {...props} />;
}
