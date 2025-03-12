
"use client";
import React from "react";
import { Button } from "../../components/ui/moving-border";
import { SignUpButton } from "@clerk/nextjs";


export function MovingBorderDemo( {text , className,containerClassName}) {

  return (
    <div>
    <Button className={className} containerClassName={containerClassName}>
      <div>
      <SignUpButton>{text}</SignUpButton>
      </div>
    </Button>
  </div>

  );
}
