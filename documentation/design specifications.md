Context:
- Items are transmuted into other items. There is some probability of success for the transmutation as a whole. Upon successful transmutation, each item has a probability table for which item it turns into.

Given:
- A dataset that links items to their probability tables

Modes of interaction:
- User selects a type of item and a quantity for that item that they want to be transmuting, and for each item possibility associated with the transmutation of that item, a range of expected output is displayed. The range is a one standard deviation confidence interval.
- User selects a type of item and a quantity for that item that they want to transmute, and for each item that results in a chance of the selected item, display a a one standard deviation confidence interval of how many items you would have to transmute of the transmuted item to have the selected quantity of the target item.

Example:
Transmutation Item: Cheese
Chance of successful transmutation: 50%
Possible outcomes
- Milk 50%
- Dirt 30%
- Bread 10%
- Uranium 5%
- Fork 5%

Mode of interaction 1 (select item to transmute):
Transmutation Item: Cheese
Quantity: 500
Results:
- Milk 27 - 400 25% * 500
- Dirt 

## Data Analysis and Conclusions

The transmutation system can be modeled as a series of multinomial distributions, where the success of a transmutation is the first multinomial distribution, and the resulting item is the second multinomial distribution.

Given a selected item and quantity, the expected output of each possible resulting item can be calculated, along with a confidence interval (one standard deviation).

Additionally, given a target item and quantity, the required number of transmuted items to achieve the target quantity can be estimated, along with a confidence interval (one standard deviation). This requires solving for the input quantity that results in the desired expected output for the target item.

## Web App Model

The web app will consist of a React front end (written in Typescript) that performs calculations using functions defined in a separate Typescript file. The front end will handle user input and display the results of the transmutation calculations. The Typescript file will be responsible for providing the transmutation data and performing the calculations.

### Front End Components

- **Item Selection Component:** A component that allows the user to select the item to be transmuted and the desired quantity.
- **Results Display Component:** A component that displays the expected output of each possible resulting item, along with a confidence interval.
- **Target Item Selection Component:** A component that allows the user to select a target item and quantity.
- **Required Items Display Component:** A component that displays the estimated number of transmuted items required to achieve the target quantity, along with a confidence interval.

## Project Roadmap

**Phase 1: Data Extraction and Modeling**
- [x] Extract transmutation data from game files.
- [x] Model the transmutation system as multinomial distributions.
- [x] Implement functions to calculate expected output and confidence intervals.

**Phase 2: Backend API Implementation**
- [ ] Create a Typescript file to serve as the backend API.
- [ ] Implement functions to provide transmutation data to the front end.
- [ ] Implement functions to perform transmutation calculations.

**Phase 3: Front End Implementation**
- [ ] Implement the Item Selection Component.
- [ ] Implement the Results Display Component.
- [ ] Implement the Target Item Selection Component.
- [ ] Implement the Required Items Display Component.
- [ ] Integrate the front end with the backend API.

**Phase 4: Testing and Refinement**
- [ ] Test the web app with various inputs and scenarios.
- [ ] Refine the UI and calculations based on user feedback.
- [ ] Add additional features and functionality as needed.


