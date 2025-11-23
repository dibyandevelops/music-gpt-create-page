import type { Meta, StoryObj } from "@storybook/react"
import { GenerationStatus } from "@/lib/types";

import StatusPill from "./StatusPill"

const meta: Meta<typeof StatusPill> = {
  title: "StatusPill",
  component: StatusPill,
  args: {
    status: "pending",
  },
  argTypes: {
    status: {
      options: ["pending", "generating", "completed", "failed"] as GenerationStatus[],
      control: { type: "select" },
    },
  },
}

type Story = StoryObj<typeof StatusPill>

export const Default: Story = {
  render: (args) => <StatusPill {...args} />,
}

export default meta
