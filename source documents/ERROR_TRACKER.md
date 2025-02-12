# Carbon DAO Error Tracker

This document tracks TypeScript errors and their fixes in the Carbon DAO project. Use this as a reference when encountering similar issues in the future.

## Fixed Errors

### 1. Contract Interface Issues (Fixed: 2025-02-11)

#### Governance.tsx
- **Error**: Property 'proposalCount', 'proposals', etc. does not exist on type 'Governance'
- **Fix**: 
  - Added proper contract interface in `types/contracts.ts`
  - Updated method names to match contract ABI
  - Methods fixed: `getProposalCount()`, `getProposal()`, `propose()`, `castVote()`, `execute()`
- **Prevention**:
  - Always ensure contract interfaces match the ABI
  - Use TypeScript interfaces for all contract interactions
  - Add null checks before contract method calls

#### Marketplace.tsx
- **Error**: Property 'getOrderCount', 'getOrder' does not exist on type 'Marketplace'
- **Fix**:
  - Added proper Order interface with required fields
  - Updated contract method calls to use correct interface
  - Added proper type definitions for all state variables
- **Prevention**:
  - Define complete interfaces for all contract-related types
  - Add proper type annotations for React state variables
  - Include null checks for contract instances

#### ProjectDashboard.tsx
- **Error**: Property 'getProjectCount' does not exist on type 'ProjectRegistry'
- **Fix**:
  - Added proper Project interface
  - Fixed contract method calls
  - Added proper type for projects array
  - Fixed JSX formatting issues
- **Prevention**:
  - Use proper typing for arrays of contract entities
  - Add proper null checks before contract calls
  - Follow React best practices for state management

### 4. Route Parameter and Redux Action Types (Fixed: 2025-02-11)

#### ProjectDetails.tsx
- **Error**: Type 'RouteParams' does not satisfy constraint
- **Error**: AsyncThunkAction type mismatch
- **Fix**:
  - Created proper `ProjectParams` interface
  - Added proper typing for Redux dispatch and actions
  - Added null checks for contract instances
  - Fixed contract method parameter types
- **Prevention**:
  - Define proper interfaces for route parameters
  - Use proper typing for Redux actions and dispatch
  - Add null checks for contract instances

### 5. Staking Contract and Redux Integration (Fixed: 2025-02-11)

#### stakingSlice.ts
- **Error**: Missing StakingState type definition
- **Fix**:
  - Added proper StakingState interface
  - Added proper action types with PayloadAction
  - Fixed async thunk parameter types
- **Prevention**:
  - Define complete state interfaces
  - Use PayloadAction for proper action typing
  - Add proper error handling in thunks

#### Staking.tsx
- **Error**: StakingState import error
- **Error**: Parameter type mismatch in contract calls
- **Fix**:
  - Updated contract method calls with proper types
  - Fixed Redux state selector types
  - Added proper error handling
  - Updated UI components with proper props
- **Prevention**:
  - Use proper typing for contract method parameters
  - Add proper type annotations for React state
  - Follow React best practices for form handling

### 6. Project State and Component Types (Fixed: 2025-02-11)

#### projectsSlice.ts
- **Error**: Missing ProjectsState type definition
- **Error**: Action type mismatch in reducers
- **Fix**:
  - Added proper ProjectsState interface
  - Added PayloadAction types for all actions
  - Fixed async thunk parameter types
  - Added proper error handling
- **Prevention**:
  - Define complete state interfaces upfront
  - Use PayloadAction for proper action typing
  - Add proper error handling in thunks

#### Projects.tsx
- **Error**: Module has no exported member 'ProjectsState'
- **Error**: Type mismatch in Redux selectors
- **Fix**:
  - Updated Redux state selector types
  - Fixed component prop types
  - Added proper type annotations for filters
  - Updated UI components with proper props
- **Prevention**:
  - Use proper typing for Redux selectors
  - Add proper type annotations for state and props
  - Follow React best practices for form handling

### 7. Project Registration Form Types (Fixed: 2025-02-11)

#### ProjectRegistration.tsx
- **Error**: Type mismatch in event handlers
- **Error**: Missing form validation types
- **Fix**:
  - Added ProjectFormData interface for form state
  - Added proper type annotations for event handlers
  - Implemented form validation with typed error state
  - Updated contract method parameters with proper types
- **Prevention**:
  - Define interfaces for form state
  - Use proper event handler types
  - Implement form validation with TypeScript
  - Add proper error handling for contract calls

## Pending Errors

## Best Practices for Error Prevention

1. **Contract Interactions**
   - Always define complete interfaces for contracts
   - Add null checks before contract calls
   - Use TypeScript's strict mode
   - Keep contract interfaces in sync with ABIs

2. **React Components**
   - Define proper types for all props
   - Use proper event types for handlers
   - Add proper type annotations for state
   - Use TypeScript's strict mode

3. **Redux State Management**
   - Define proper types for all state slices
   - Use proper typing for action creators
   - Add proper return types for selectors
   - Keep state interfaces up to date

4. **General TypeScript**
   - Use strict mode
   - Avoid any type
   - Define interfaces for all complex objects
   - Use proper type guards when necessary

## Common Error Patterns and Solutions

1. **Contract Method Not Found**
   ```typescript
   // Wrong
   const count = await contract.count();
   
   // Right
   interface MyContract extends ethers.Contract {
     count(): Promise<ethers.BigNumber>;
   }
   const count = await contract?.count();
   ```

2. **State Type Mismatch**
   ```typescript
   // Wrong
   const [state, setState] = useState([]);
   
   // Right
   interface StateType {
     id: number;
     name: string;
   }
   const [state, setState] = useState<StateType[]>([]);
   ```

3. **Event Handler Type**
   ```typescript
   // Wrong
   const handleChange = (e) => {};
   
   // Right
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
   ```

## Update History

- **2025-02-11**: Initial creation
  - Documented fixes for Governance.tsx, Marketplace.tsx, and ProjectDashboard.tsx
  - Listed pending errors in other components
  - Added best practices section
- **2025-02-11**: Updated error tracker with latest fixes for ProjectDetails.tsx and Staking.tsx
- **2025-02-11**: Updated error tracker with latest fixes for Projects.tsx and projectsSlice.ts
- **2025-02-11**: Updated error tracker with latest fixes for ProjectRegistration.tsx
