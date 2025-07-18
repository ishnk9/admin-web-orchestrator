# Services Documentation

This folder contains all backend integration functions organized by functionality.

## Structure

```
src/services/
├── admins/
│   ├── adminService.ts
│   └── index.ts
├── auth/
│   ├── authService.ts
│   └── index.ts
├── superadmins/
│   ├── superadminService.ts
│   └── index.ts
├── users/
│   ├── userService.ts
│   └── index.ts
├── apiList.ts
├── axiosConfig.ts
├── index.ts
└── README.md
```

## Files Description

### `axiosConfig.ts`
- Configured axios instance with interceptors
- Automatic token management
- Error handling for common HTTP status codes
- Base URL configuration

### `apiList.ts`
- All API endpoints organized by category
- TypeScript interfaces for API responses
- Type definitions for all entities

### Service Files
Each service file contains:
- CRUD operations for the respective entity
- Type-safe request/response interfaces
- Error handling
- Token management

## Usage Examples

### Authentication
```typescript
import { AuthService } from '@/services';

// Login as admin
const response = await AuthService.adminLogin({
  email: 'admin@example.com',
  password: 'password'
});

// Check authentication status
const isAuthenticated = AuthService.isAuthenticated();

// Logout
AuthService.logout();
```

### Admin Management
```typescript
import { AdminService } from '@/services';

// Create admin
const newAdmin = await AdminService.createAdmin({
  email: 'admin@example.com',
  name: 'Admin User',
  password: 'password'
});

// Get all admins with pagination
const admins = await AdminService.getAllAdmins(1, 10);

// Update admin
const updatedAdmin = await AdminService.updateAdmin('admin-id', {
  name: 'Updated Name'
});
```

### User Management
```typescript
import { UserService } from '@/services';

// Get all users
const users = await UserService.getAllUsers();

// Get specific user
const user = await UserService.getUserById('user-id');

// Delete user
await UserService.deleteUser('user-id');
```

### SuperAdmin Management
```typescript
import { SuperAdminService } from '@/services';

// Create superadmin
const superadmin = await SuperAdminService.createSuperAdmin({
  email: 'super@example.com',
  name: 'Super Admin',
  password: 'password'
});

// Login as superadmin
const loginResponse = await SuperAdminService.login({
  email: 'super@example.com',
  password: 'password'
});
```

## Environment Variables

Set the following environment variable in your `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Error Handling

All services include automatic error handling:
- 401: Automatic logout and redirect to login
- 403: Access denied handling
- 500: Server error handling
- Network errors are properly propagated

## Type Safety

All services are fully typed with TypeScript:
- Request interfaces for all operations
- Response interfaces for all API calls
- Proper error typing
- Pagination support 