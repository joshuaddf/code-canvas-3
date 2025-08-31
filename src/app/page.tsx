import BananaModel from "@/components/BananaModel";

export default function Home(){
  return (
    <main className="relative f-full h-[100dvh] flex flex-col">
      <div className="fixed top-0 left-0 w-full h-full bg-orange-400/10 z-10 backdrop-blur-[6px]" />
      <div className="fixed top-0 left-0 w-full h-full">
      <BananaModel count={100} depth={50} />
      </div>
      <div className="z-10 font-black text-2xl">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae rerum, dicta ipsum doloribus adipisci nihil expedita non ea odio. In animi earum aperiam nesciunt natus, asperiores assumenda deleniti eaque? Aliquid totam quo velit adipisci aperiam, eaque quia culpa odio!</p>
      </div>
    </main>
  )
}