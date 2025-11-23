import { Metadata } from "next"
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Music GPT",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://musicgpt.com/create",
    images: [
      {
        width: 1200,
        height: 630,
        url: "",
      },
    ],
  },
}

const CreateInterface = dynamic(() => import("@/components/CreateInterface/CreateInterface"))


export default function Web() {
  return (
    <>
      <CreateInterface />
    </>
  )
}
