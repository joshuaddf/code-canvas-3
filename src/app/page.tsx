import BananaModel from "@/components/BananaModel";

export default function Home(){
  return (
    <main className="relative f-full h-[100dvh]">
      <div className="fixed top-0 left-0 w-full h-full bg-orange-400/10 z-10 backdrop-blur-[6px]" />
      <BananaModel count={100} depth={60} />
    </main>
  )
}