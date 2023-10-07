import React from "react";
import {Meta} from "@storybook/react";
import {slider} from "@nextui-org/theme";
import {VolumeHighBoldIcon, VolumeLowBoldIcon} from "@nextui-org/shared-icons";

import {Slider, SliderProps, SliderValue} from "../src";

export default {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    label: {
      control: {type: "text"},
    },
    fillOffset: {
      control: {type: "number"},
    },
    color: {
      control: {type: "select"},
      options: ["foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    showTooltip: {
      control: {
        type: "boolean",
      },
    },
    step: {
      control: {
        type: "number",
      },
    },
    showSteps: {
      control: {
        type: "boolean",
      },
    },
    startContent: {
      table: {
        disable: true,
      },
    },
    endContent: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Slider>;

const defaultProps = {
  ...slider.defaultVariants,
};

const Template = (args: SliderProps) => (
  <div className="flex w-full h-full max-w-md items-center justify-start">
    <Slider {...args} />
  </div>
);

const CustomStylesTemplate = (args: SliderProps) => (
  <div className="flex items-center justify-center w-screen h-screen ">
    <div className="flex items-center justify-center w-full h-full max-w-md">
      <Slider
        {...args}
        classNames={{
          filler: ["bg-gradient-to-r from-primary-500 to-secondary-400"],
          labelWrapper: "mb-2",
          label: "font-medium text-default-700 text-medium",
          output: "font-medium text-default-500 text-small",
          thumb: [
            "transition-size",
            "bg-gradient-to-r from-secondary-400 to-primary-500",
            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
            args.size === "sm" || args.size === "md"
              ? "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
              : "",
          ],
          step:
            args.size === "sm" && args.showSteps
              ? "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
              : "",
        }}
        disableThumbScale={args.size !== "lg"}
        showOutline={args.showOutline && args.size !== "lg"}
        tooltipProps={{
          offset: 10,
          placement: "bottom",
          classNames: {
            base: [
              // arrow color
              "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
            ],
            content: [
              "py-2 px-3 shadow-xl",
              "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
            ],
          },
        }}
      />
    </div>
  </div>
);

const VerticalTemplate = (args: SliderProps) => (
  <div className="flex max-w-md h-[448px] items-center justify-start">
    <Slider {...args} />
  </div>
);

const ControlledTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>(25);

  return (
    <div className="flex flex-col gap-2  w-full h-full max-w-md items-start justify-center">
      <Slider value={value} onChange={setValue} {...args} />
      <p className="text-default-500 text-small">Current volume: {value}</p>
    </div>
  );
};

const ControlledRangeTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState<SliderValue>([25, 75]);

  return (
    <div className="flex flex-col gap-2  max-w-md items-start justify-center">
      <Slider value={value} onChange={setValue} {...args} />
      <p className="text-default-500 text-small">
        Current volume: {Array.isArray(value) && value.join(" – ")}
      </p>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a number",
  },
};

export const ShowSteps = {
  render: Template,
  args: {
    ...defaultProps,
    showSteps: true,
    step: 5,
    label: "Select a number",
  },
};

export const Range = {
  render: Template,
  args: {
    ...defaultProps,
    showTooltip: true,
    label: "Select a range",
    formatOptions: {style: "currency", currency: "USD"},
    defaultValue: [20, 80],
  },
};

export const FillOffset = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a value",
    maxValue: 50,
    minValue: -50,
    fillOffset: 0,
    defaultValue: 20,
  },
};

export const WithMarks = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a value",
    renderOutput: (value) => `${value}%`,
    step: 10,
    marks: [
      {
        value: 20,
        label: "20%",
      },
      {
        value: 50,
        label: "50%",
      },
      {
        value: 80,
        label: "80%",
      },
    ],
    defaultValue: 20,
  },
};

export const WithTooltip = {
  render: Template,
  args: {
    ...defaultProps,
    label: "Select a value",
    showTooltip: true,
    renderOutput: (value) => `${value}%`,
    step: 10,
    marks: [
      {
        value: 20,
        label: "20%",
      },
      {
        value: 50,
        label: "50%",
      },
      {
        value: 80,
        label: "80%",
      },
    ],
    defaultValue: 20,
  },
};

export const VerticalOrientation = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    orientation: "vertical",
    defaultValue: 20,
  },
};

export const WithMarksVerticalOrientation = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    label: "Current value",
    orientation: "vertical",
    renderOutput: (value) => `${value}%`,
    step: 10,
    marks: [
      {
        value: 20,
        label: "20%",
      },
      {
        value: 50,
        label: "50%",
      },
      {
        value: 80,
        label: "80%",
      },
    ],
    defaultValue: 20,
  },
};

export const VerticalWithSteps = {
  render: VerticalTemplate,
  args: {
    ...defaultProps,
    step: 5,
    showSteps: true,
    orientation: "vertical",
    defaultValue: 20,
  },
};

export const WithStartAndEndContent = {
  render: Template,
  args: {
    ...defaultProps,
    defaultValue: 20,
    "aria-label": "Volume",
    startContent: <VolumeLowBoldIcon className="text-2xl" />,
    endContent: <VolumeHighBoldIcon className="text-2xl" />,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
    "aria-label": "Volume",
    startContent: <VolumeLowBoldIcon className="text-2xl" />,
    endContent: <VolumeHighBoldIcon className="text-2xl" />,
  },
};

export const ControlledRange = {
  render: ControlledRangeTemplate,
  args: {
    ...defaultProps,
    label: "Select a budget",
    formatOptions: {style: "currency", currency: "USD"},
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
    label: "Price Range",
    maxValue: 1000,
    size: "md",
    step: 100,
    showSteps: true,
    showOutline: true,
    defaultValue: [100, 300],
    disableThumbScale: true,
    showTooltip: true,
    formatOptions: {style: "currency", currency: "USD"},
    tooltipValueFormatOptions: {style: "currency", currency: "USD", maximumFractionDigits: 0},
  },
};