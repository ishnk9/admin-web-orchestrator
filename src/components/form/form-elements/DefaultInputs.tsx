"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import { EyeCloseIcon, EyeIcon } from '../../../icons';
import Button from '../../ui/button/Button';

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  
  const handleCreateUser = () => {
    // Handle user creation logic here
    console.log("Creating user...");
  };
  
  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label>First Name</Label>
          <Input type="text" placeholder="Enter your first name" />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input type="text" placeholder="Enter your last name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email address" />
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showEmailPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowEmailPassword(!showEmailPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showEmailPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div className="pt-4">
          <Button onClick={handleCreateUser} className="w-full">
            Create User
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
