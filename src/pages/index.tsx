import ZSButton from "@/components/common/ZSButton";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  return <div className="flex flex-col justify-center items-center">
    <span className="text-blue-500  text-3xl pt-4 pb-6">Tech stack used</span>
    <div className="flex flex-wrap space-x-8 justify-center">
      <Image src='/images/nextjs.png' width={130} height={30} alt='next' />
      <Image src='/images/react.png' width={130} height={30} alt='react' />
      <Image src='/images/material.png' width={130} height={30} alt='material' />
      <Image src='/images/postgres.svg' width={130} height={30} alt='postgres' />
      <Image src='/images/prisma.svg' width={130} height={30} alt='prisma' />
      <Image src='/images/recharts.png' width={130} height={30} alt='recharts' />
      <Image src='/images/swr.png' width={130} height={30} alt='swr' />
      <Image src='/images/tailwind.png' width={130} height={30} alt='tailwind' />
      <Image src='/images/typescript.png' width={130} height={30} alt='typescript' />
    </div>
    <div className="flex space-x-3 mt-7">
      <ZSButton onClick={() => router.push('/graph')}>Visit graph</ZSButton>
      <ZSButton onClick={() => router.push('/table')}>Visit table</ZSButton>
    </div>
    <div className="mt-10">Logo credits <a href="https://www.zscaler.com/" target='_blank' className="text-blue-500 font-semibold">zscaler</a> </div>
  </div>
}
