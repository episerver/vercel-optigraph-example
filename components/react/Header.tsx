/* Header */
import Link from "next/link";

interface Config {
    height: number
}

export default function Header({height}: Config) {
    const coverImage = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

    return (
        <div className="w-full m-0 p-0 bg-cover bg-bottom"
             style={{backgroundImage: `url(${coverImage})`, height: `${height}vh`, maxHeight: '460px'}}>
            <Link href="/">
                <div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
                    <p className="text-white font-extrabold text-4xl md:text-6xl">
                        The City Guide
                    </p>
                </div>
            </Link>

        </div>
    );
}
