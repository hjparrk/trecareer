import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-full max-w-5xl lg:max-w-6xl mx-auto px-5 py-10 lg:py-20">
      <div className="mx-auto w-fit flex flex-col space-y-3 text-left">
        {/* Main */}
        <div className="grid grid-cols-1 gap-20 lg:gap-5 lg:grid-cols-5">
          <section className="flex flex-col space-y-10 lg:space-y-20 lg:col-span-3">
            <div>
              <div className="font-extrabold tracking-tighter">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                  Lost in Your Job Search?
                </h1>
                <div className="text-4xl sm:text-6xl lg:text-7xl -rotate-2 flex flex-col space-y-3">
                  <h1>Track Your</h1>
                  <h1>Applications with</h1>
                  <h1 className="w-fit px-5 sm:px-10 bg-gradient-to-r from-green-300 to-pink-300">
                    Trecareer !
                  </h1>
                </div>
              </div>

              <h3 className="text-gray-500/80 font-medium mt-10 text-sm sm:text-base lg:text-lg">
                Trecareer is a tool that helps job seekers track their
                applications.
              </h3>
            </div>
            <Button
              asChild
              className="w-fit text-sm sm:text-base font-bold hover:text-black/80 hover:bg-gradient-to-r hover:from-green-500 hover:to-pink-500"
            >
              <Link href={"/signin"}>Create My Tracker</Link>
            </Button>
          </section>

          <section className="lg:col-span-2">
            {/* Img */}
            <Image
              src={"/hero-img.png"}
              alt=""
              width={838}
              height={688}
              className="object-contain w-full"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
