import { useCallback, useState } from "react"
import { defaultFormState } from "@/lib/constants"
import { GenerationJob } from "@/lib/types"
import { useGenerationStore } from "@/store /useGenerationStore"

export const useGenerationForm = () => {
  const [form, setForm] = useState(defaultFormState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { upsert, items } = useGenerationStore((state) => state)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.prompt.trim()) {
      setError("Describe the sound you want to generate.")
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error("Failed request")
      }

      const job = (await response.json()) as GenerationJob
      upsert(job)
      setForm((prev) => ({ ...prev, prompt: "" }))
    } catch {
      setError("We could not queue that request. Try again in a moment.")
    } finally {
      setSubmitting(false)
    }
  }


  return {
    form,
    setForm,
    submitting,
    setSubmitting,
    error,
    setError,
    handleSubmit,
    items,
  }
}
