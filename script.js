// ------------------------
// Smoothie Builder Class
// ------------------------
class SmoothieOrder {
    constructor({size, base, fruits = [], extras = []}) {
        this.size = size;
        this.base = base;
        this.fruits = fruits;
        this.extras = extras;
        this.price = this.computePrice();
    }

    computePrice() {
        let price = 0;

        switch(this.size) {
            case "small": price = 3; break;
            case "medium": price = 5; break;
            case "large": price = 7; break;
            default: price = 0;
        }

        // Each extra adds $1
        price += this.extras.length;

        return price;
    }

    summaryHTML() {
        const fruitText = this.fruits.length ? this.fruits.join(", ") : "None";
        const extraText = this.extras.length ? this.extras.join(", ") : "None";

        return `
            <div class="summary-box">
                <h2>🍓 Your Smoothie Details</h2>
                <ul>
                    <li><strong>Size:</strong> ${this.size}</li>
                    <li><strong>Base:</strong> ${this.base}</li>
                    <li><strong>Fruits:</strong> ${fruitText}</li>
                    <li><strong>Extras:</strong> ${extraText}</li>
                    <li><strong>Total Cost:</strong> $${this.price.toFixed(2)}</li>
                </ul>
            </div>
        `;
    }
}

// ------------------------
// Handle Form Submit
// ------------------------
const form = document.getElementById("smoothieForm");
form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get selected size and base
    const size = form.size.value;
    const base = form.base.value;

    // Get checked fruits and extras
    const fruits = [...document.querySelectorAll("input[name='fruit']:checked")].map(f => f.value);
    const extras = [...document.querySelectorAll("input[name='extra']:checked")].map(e => e.value);

    // Create SmoothieOrder object
    const smoothie = new SmoothieOrder({ size, base, fruits, extras });

    // Display summary
    document.getElementById("orderSummary").innerHTML = smoothie.summaryHTML();
});
