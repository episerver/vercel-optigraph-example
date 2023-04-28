import { JumbotronBlock } from "@/generated";

export default function Jumbotron(data : JumbotronBlock){
    return(
        <div
          className="hero min-h-screen bg-cover bg-[url('https://hello-world.opti-demo.xyz/globalassets/pexels-office.jpg')] image-full"
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-8xl font-bold">{data.Heading}</h1>
              <p className="mb-5 text-2xl">
                {data.SubHeading}
              </p>
              <a href={data.ButtonLink} className="btn btn-primary">{data.ButtonText}</a>
            </div>
          </div>
        </div>
    );
}