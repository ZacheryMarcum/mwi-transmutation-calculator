You are an AI programming assistant. Your task is to implement the "NGU Calculator" web application based on the provided design specifications.

**Project Goal:**
Create a web application using React (with Typescript) and a separate Typescript calculation module. The app will calculate transmutation outcomes in the game NGU Idle based on user input, displaying expected results or required inputs with one standard deviation confidence intervals.

**Core Requirements:**
1.  **Backend Logic (`src/calculations.ts`):**
    *   Define data structures/interfaces for items, including their transmutation success chance and outcome probability tables (e.g., `interface ItemData { successChance: number; outcomes: { [itemName: string]: number }; }`).
    *   Define a structure for calculation results (e.g., `interface CalculationResult { mean: number; stdDev: number; }`).
    *   Implement `calculateExpectedOutputs(transmuteItemName: string, quantity: number, itemDb: { [key: string]: ItemData }): { [outputItem: string]: CalculationResult }`. This function calculates the expected mean and standard deviation for each possible output item given an input item and quantity, considering both the initial transmutation success chance and the subsequent outcome probabilities (modeled as sequential multinomial distributions).
    *   Implement `calculateRequiredInputs(targetItemName: string, targetQuantity: number, itemDb: { [key: string]: ItemData }): { [inputItem: string]: CalculationResult }`. This function calculates the estimated mean and standard deviation for the *input* quantity of each item *capable* of producing the target item, required to achieve the specified `targetQuantity`.
    *   Include placeholder data for at least the "Cheese" example provided in the specifications.
    *   Ensure calculations correctly derive the mean and standard deviation for the described two-stage process.

2.  **Frontend (`src/` directory, using Typescript with React functional components and hooks):**
    *   **`App.tsx`:** Main component to manage application state (selected items, quantities, results, calculation mode), orchestrate calculations by calling functions from `calculations.ts`, and render appropriate UI components. Include logic to switch between the two calculation modes.
    *   **`components/ItemSelectionComponent.tsx`:** Component for Mode 1 (Expected Output). Allows selecting the item to transmute and inputting the quantity. Triggers calculations via callbacks.
    *   **`components/ResultsDisplayComponent.tsx`:** Component for Mode 1. Displays the calculated expected outputs (item name, mean, std dev, confidence interval) passed via props.
    *   **`components/TargetItemSelectionComponent.tsx`:** Component for Mode 2 (Required Input). Allows selecting the target item and desired quantity. Triggers calculations via callbacks.
    *   **`components/RequiredItemsDisplayComponent.tsx`:** Component for Mode 2. Displays the calculated required input items (item name, mean required, std dev, confidence interval) passed via props.

**Instructions:**
Generate the Typescript code for the `calculations.ts` module first, including function implementations and placeholder data. Then, generate the React components (`App.tsx` and the components in the `components/` directory), ensuring they interact correctly with the calculation module and manage state appropriately. Use clear variable names and include comments explaining the logic, especially for the statistical calculations.