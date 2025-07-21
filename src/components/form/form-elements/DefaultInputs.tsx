"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import { EyeCloseIcon, EyeIcon } from '../../../icons';
import Button from '../../ui/button/Button';
import { UserService } from '../../../services/users/userService';

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      // The API expects: { email, name, password }
      const name = `${firstName} ${lastName}`.trim();
      const res = await UserService.createUser({ first_name: firstName, last_name: lastName, email, password });
      alert('User created successfully!');
      // Optionally reset form
      // setFirstName('');
      // setLastName('');
      // setEmail('');
      // setPassword('');
    } catch (err: any) {
      alert(err?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label>First Name</Label>
          <Input type="text" placeholder="Enter your first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input type="text" placeholder="Enter your last name" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showEmailPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowEmailPassword(!showEmailPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              type="button"
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
          <Button onClick={handleCreateUser} className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
