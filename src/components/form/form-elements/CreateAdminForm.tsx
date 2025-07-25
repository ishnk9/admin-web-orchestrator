"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import { EyeCloseIcon, EyeIcon } from '../../../icons';
import Button from '../../ui/button/Button';
import { AdminService } from '../../../services/admins/adminService';
import { toast } from 'sonner';
import Select from '../Select';

export default function CreateAdminForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [permissionsLevel, setPermissionsLevel] = useState('admin');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async () => {
    if (!name || !email || !password || !company) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await AdminService.createAdmin({ 
        name, 
        email, 
        password, 
        company, 
        permissions_level: permissionsLevel 
      });
      
      if (res && res?.data) {
        toast.success('Admin created successfully!');
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setCompany('');
        setPermissionsLevel('admin');
      } else {
        toast.error('Failed to create admin');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ComponentCard title="Create Admin">
      <div className="space-y-6">
        <div>
          <Label>Name *</Label>
          <Input 
            type="text" 
            placeholder="Enter admin name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>
        
        <div>
          <Label>Email *</Label>
          <Input 
            type="email" 
            placeholder="Enter admin email address" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        
        <div>
          <Label>Password *</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              type="button"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
        
        <div>
          <Label>Company *</Label>
          <Input 
            type="text" 
            placeholder="Enter company name" 
            value={company} 
            onChange={e => setCompany(e.target.value)} 
          />
        </div>
        
        <div>
          <Label>Permissions Level</Label>
          <Select
            defaultValue={permissionsLevel}
            onChange={(value) => setPermissionsLevel(value)}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'super_admin', label: 'Super Admin' },
            ]}
            placeholder="Select permissions level"
          />
        </div>
        
        <div className="pt-4">
          <Button onClick={handleCreateAdmin} className="w-full" disabled={loading}>
            {loading ? 'Creating Admin...' : 'Create Admin'}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
} 