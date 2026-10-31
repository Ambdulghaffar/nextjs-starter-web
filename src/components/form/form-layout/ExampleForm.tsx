"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { BoxIcon, ChevronDownIcon, EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import TextArea from "../input/TextArea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import Select from "../Select";

const options = [
  { value: "marketing", label: "Marketing" },
  { value: "template", label: "Template" },
  { value: "development", label: "Development" },
];
const countries = [
  { code: "US", label: "+1" },
  { code: "GB", label: "+44" },
  { code: "CA", label: "+1" },
  { code: "AU", label: "+61" },
];
export default function ExampleForm() {
  const [message, setMessage] = useState("");

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Example Form">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label>First Name</Label>
          <Input type="text" placeholder="Enter text here" />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input type="text" placeholder="Enter text here" />
        </div>
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" placeholder="visitor@gmail.com" />
      </div>
      <div>
        <Label>Select Input</Label>
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
          <span
            className="pointer-events-none absolute top-1/2 right-3
              -translate-y-1/2 text-gray-500 dark:text-gray-400"
          >
            <ChevronDownIcon />
          </span>
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <TextArea
          value={message}
          onChange={(value) => setMessage(value)}
          rows={6}
        />
      </div>
      <Button
        type="button"
        size="form-sm"
        variant="brand"
        className="w-full"
        endIcon={<SendIcon size={16} />}
      >
        Send Message
      </Button>
    </ComponentCard>
  );
}
