/* Header */
import Link from "next/link";

interface Config {
  height: number;
}

export default function Header({ height }: Config) {
  const coverImage = "/city-guide.avif";

  return (
    <div
      className="w-full m-0 p-0 bg-cover bg-bottom"
      style={{
        backgroundImage: `url(${coverImage})`,
        height: `${height}vh`,
        maxHeight: "460px",
      }}
    >
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
