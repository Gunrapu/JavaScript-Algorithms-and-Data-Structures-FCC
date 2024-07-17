# Cash Register Application

This application simulates a cash register that calculates change due to customers based on their payment and the price of an item.

## Features

- Calculate change based on user input (item price and payment).
- Update cash drawer display in real-time.
- Handle different scenarios like exact payment, insufficient funds, and closed register.

## How to use

    1. Enter the price of the item in the "Price" input field.
    2. Enter the amount paid by the customer in the "Cash" input field.
    3. Click the "Purchase" button to calculate change.
    4. The result will be displayed in the "Change Due" section, showing the status (OPEN or CLOSED) and the breakdown of change in bills and coins.

## Tech Stack

**Client:** Html, CSS, Javascript

## User stories

    1. You should have an input element with an id of "cash"
    2. You should have a div, span or p element with an id of "change-due"
    3. You should have a button element with an id of "purchase-btn"
    4. When the value in the #cash element is less than price, an alert should appear with the text "Customer does not have enough money to purchase the item"
    5. When the value in the #cash element is equal to price, the value in the #change-due element should be "No change due - customer paid with exact cash"
    6. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: OPEN QUARTER: $0.5"
    7. When price is 3.26, the value in the #cash element is 100, cid is [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04"
    8. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS"
    9. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS"
    10. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: CLOSED PENNY: $0.5"

## Credits

This project was developed as part of the FreeCodeCamp JavaScript certificate project. For more information, visit FreeCodeCamp.