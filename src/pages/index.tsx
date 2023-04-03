import ZSButton from "@/components/common/ZSButton";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  return <div className="flex flex-col justify-center items-center">
    <span className="text-blue-500  text-3xl pt-4 pb-6">Tech stack used</span>
    <div className="flex flex-wrap  justify-center">
      <Image src='/images/nextjs.png' width={120} height={30} alt='next' className="py-2 px-3" />
      <Image src='/images/react.png' width={120} height={30} alt='react' className="py-2  px-3" />
      <Image src='/images/material.png' width={120} height={30} alt='material' className="py-2 px-3" />
      <Image src='/images/postgres.svg' width={120} height={30} alt='postgres' className="py-2 px-3" />
      <Image src='/images/prisma.svg' width={120} height={30} alt='prisma' className="py-2 px-3" />
      <Image src='/images/recharts.png' width={120} height={30} alt='recharts' className="py-2 px-3" />
      <Image src='/images/swr.png' width={120} height={30} alt='swr' className="py-2 px-3" />
      <Image src='/images/tailwind.png' width={120} height={30} alt='tailwind' className="py-2 px-3" />
      <Image src='/images/typescript.png' width={120} height={30} alt='typescript' className="py-2 px-3" />
    </div>
    <div className="flex space-x-3 mt-14">
      <ZSButton onClick={() => router.push('/graph')}>Visit graph</ZSButton>
      <ZSButton onClick={() => router.push('/table')}>Visit table</ZSButton>
    </div>
    <div className="mt-10">Logo credits <a href="https://www.zscaler.com/" target='_blank' className="text-blue-500 font-semibold">zscaler</a> </div>
  </div>
}
