import { Component } from '@angular/core';

@Component({
  selector: 'vCalc',
  styleUrls: [ './app.component.css' ],
  template: `
    <!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link rel="stylesheet" type="text/css" href="StyleSheet.css">
    <script src="calc.js"></script>
    <meta charset="utf-8" />
    <title>Calculator</title>
</head>
<body>
    <section>
        <table>
            <tr>
                <th colspan="4">
                    <div>{{ history }}</div>
                    <div>{{ display }}</div>
                </th>
            </tr>
            <tr>
                <th colspan="2"><button (click)="keyPress('CE')">CE</button></th>
                <th colspan="2"><button (click)="keyPress('C')">C</button></th>
            </tr>
            <tr>
                <td><button (click)="keyPress('7')">7</button></td>
                <td><button (click)="keyPress('8')">8</button></td>
                <td><button (click)="keyPress('9')">9</button></td>
                <td><button (click)="keyPress('/')">/</button></td>
            </tr>
            <tr>
                <td><button (click)="keyPress('4')">4</button></td>
                <td><button (click)="keyPress('5')">5</button></td>
                <td><button (click)="keyPress('6')">6</button></td>
                <td><button (click)="keyPress('*')">*</button></td>
            </tr>
            <tr>
                <td><button (click)="keyPress('1')">1</button></td>
                <td><button (click)="keyPress('2')">2</button></td>
                <td><button (click)="keyPress('3')">3</button></td>
                <td><button (click)="keyPress('-')">-</button></td>
            </tr>
            <tr>
                <td><button (click)="keyPress('0')">0</button></td>
                <td><button (click)="keyPress('.')">.</button></td>
                <td><button (click)="keyPress('=')">=</button></td>
                <td><button (click)="keyPress('+')">+</button></td>
            </tr>
        </table>
    </section>
</body>
</html>`
})
export class vCalcComponent  {
  // JavaScript source code
currentValue = "0";
lastValue = "0";
lastOperation = "";
grandTotal = "0";
lastTotal = "0";
runningTotal = "";
display = "";
history = "";

keyPress(k1: string) {
    switch (k1) {
        case "C":
            this.currentValue = "0";
            this.lastValue = "";
            this.grandTotal = "";
            this.lastTotal = "";
            this.lastOperation = "";
            this.runningTotal = "0";
            this.history = this.runningTotal;
            this.display = this.currentValue;
            break;
        case "CE":
            this.currentValue = "0";
            this.display = this.currentValue;
            break;
        case "=":
        case "+":
        case "*":
        case "/":
        case "-":
            if (this.lastOperation) {
                switch (this.lastOperation) {
                    case "-":
                        // Subtraction
                        this.grandTotal = (Number(this.lastValue) - Number(this.currentValue)).toString();
                        break;
                    case "+":
                        // Addition
                        this.grandTotal = (Number(this.lastValue) + Number(this.currentValue)).toString();
                        break;
                    case "*":
                        // Multiplication
                        this.grandTotal = (Number(this.lastValue) * Number(this.currentValue)).toString();
                        break;
                    case "/":
                        // Division
                        this.grandTotal = (Number(this.lastValue) / Number(this.currentValue)).toString();
                        break;
                }
                this.currentValue = "0";
                this.currentValue = this.grandTotal;
            }
            if (k1 == "=") {
                // No need to keep track of this last operator
                this.lastOperation = "";
                this.currentValue = "";
                this.lastTotal = this.grandTotal;
                this.runningTotal = this.grandTotal;
                this.grandTotal = "0";
                this.history = "0";
                this.display = this.lastTotal;
            } else {
                if (!this.currentValue) {
                    this.currentValue = this.lastTotal;
                }
                // Keep track of the last operator
                if (this.lastOperation && this.lastOperation == this.runningTotal.substr(0, this.runningTotal.length - 1)) {
                    this.runningTotal = this.runningTotal.substr(0, this.runningTotal.length - 1) + k1;
                } else {
                    this.runningTotal = this.currentValue + k1;
                }
                this.lastOperation = k1;
                this.lastValue = this.currentValue;
                this.currentValue = "0";
                // Update the running total
                this.history = this.runningTotal;
                // Update the current value
                this.display = this.currentValue;
            }
            break;
        default:
            // non-operation key pressed.
            if (k1 == "." && this.currentValue.indexOf(".")!=-1) {
                // A second '.' was entered, so ignore in.
            } else if (this.currentValue=="0") {
                this.currentValue = k1;
            } else {
                this.currentValue += k1;
            }

            // Update the display with the current value.
            this.display = this.currentValue;
            break;
    }
}
}
