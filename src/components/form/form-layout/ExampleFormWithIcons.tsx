"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon, TimeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import DatePicker from "../date-picker";
import { Button } from "@/components/ui/button";
import { PlusIcon, SendIcon } from "lucide-react";

export default function ExampleFormWithIcons() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Example Form with Icons">
      <div className="grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2">
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
            <span
              className="absolute top-1/2 left-0 -translate-y-1/2 border-r
                border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800
                dark:text-gray-400"
            >
              <EnvelopeIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Phone</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Date Picker Input"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span
              className="pointer-events-none absolute top-1/2 right-3
                -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              <TimeIcon />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Card number"
              className="pl-[62px]"
            />
            <span
              className="absolute top-1/2 left-0 flex h-11 w-[46px]
                -translate-y-1/2 items-center justify-center border-r
                border-gray-200 dark:border-gray-800"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </span>
          </div>
        </div>
        <Button
          type="button"
          size="form-sm"
          variant="brand"
          className="col-span-2 w-full"
          startIcon={<PlusIcon size={16} />}
        >
          Create an account
        </Button>
      </div>
    </ComponentCard>
  );
}
