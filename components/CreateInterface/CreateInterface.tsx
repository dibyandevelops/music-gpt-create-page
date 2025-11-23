"use client"
import { motion } from "framer-motion"
import * as React from "react"
import { useGenerationSocket } from "@/hooks/useGenerationSocket"
import { BackgroundAura, GenerationForm, GenerationQueue, PageHeader } from "./CreateInterface.components"
import { useGenerationForm } from "./CreateInterface.hooks"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICreateInterfaceProps {}
const CreateInterface: React.FunctionComponent<ICreateInterfaceProps> = () => {
  useGenerationSocket()
  const { error, form, submitting, setForm, handleSubmit, items: generatedItems } = useGenerationForm()
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <BackgroundAura />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-12">
        <PageHeader />
        <section className="grid gap-8 lg:grid-cols-[1.2fr,0.9fr]">
          <motion.div layout className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <GenerationForm
              form={form}
              error={error}
              submitting={submitting}
              setForm={setForm}
              onSubmit={handleSubmit}
            />
          </motion.div>
          <motion.div
            layout
            className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_0_60px_rgba(96,165,250,0.15)]"
          >
            <GenerationQueue items={generatedItems} />
          </motion.div>
        </section>
      </div>
    </div>
  )
}
export default CreateInterface
