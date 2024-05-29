# TypeScript and Jest Minimal Setup

This guide will help you set up a minimal TypeScript project and test it using Jest. This setup is designed to be quick and dirty, suitable for solving a programming puzzle with minimal configuration.

## Step 1: Initialize the Project

1. **Create a project directory:**

   ```bash
   mkdir typescript-jest-minimal
   cd typescript-jest-minimal
   ```

2. **Initialize npm:**
   ```bash
   npm init -y
   ```

## Step 2: Install Dependencies

3. **Install TypeScript, Jest, and the necessary type definitions:**
   ```bash
   npm install --save-dev typescript jest @types/jest ts-jest
   ```

## Step 3: Configure TypeScript

4. **Create a `tsconfig.json` file:**
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     }
   }
   ```

## Step 4: Configure Jest

5. **Create a `jest.config.js` file:**
   ```js
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
   };
   ```

## Step 5: Write Your TypeScript Code

6. **Create a simple TypeScript file, e.g., `sum.ts`:**
   ```typescript
   export function sum(a: number, b: number): number {
     return a + b;
   }
   ```

## Step 6: Write a Test File

7. **Create a test file, e.g., `sum.test.ts`:**

   ```typescript
   import { sum } from './sum';

   test('adds 1 + 2 to equal 3', () => {
     expect(sum(1, 2)).toBe(3);
   });
   ```

## Step 7: Add Test Script

8. **Update the `package.json` to add a test script:**
   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

## Step 8: Run the Tests

9. **Run your tests:**
   ```bash
   npm test
   ```
