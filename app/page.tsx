import { Metadata } from "next"

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

export default function Web() {
  return (
    <>
      <div>Page Content</div>
    </>
  )
}
