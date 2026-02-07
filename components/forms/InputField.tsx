"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const InputField: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  value,
  disabled,
}) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <div className="relative">
        <Input
          type={resolvedType}
          id={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "form-input",
            isPassword && "pr-10", // leave room for the eye button
            {
              "opacity-50 cursor-not-allowed": disabled,
            }
          )}
          {...register(name, validation)}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
