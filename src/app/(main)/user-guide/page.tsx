import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function UserGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">User Guide</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Me Coffee Dashboard!</CardTitle>
          <CardDescription>
           This guide will help you understand and use all available features to efficiently manage your coffee business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">1. Dashboard</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  The Dashboard is your main page for a quick business overview.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Stat Summary: You will see 4 main cards displaying:</strong>
                    <ul className="list-disc pl-6 mt-2">
                        <li><strong>Today's Revenue: Total income recorded today.</strong></li>
                        <li><strong>Today's Expenses: Total expenses recorded today.</strong></li>
                        <li><strong>Profit: The difference between today's revenue and expenses.</strong></li>
                        <li><strong>Stock Available: The number of types of raw materials in your inventory.</strong></li>
                    </ul>
                  </li>
                  <li>
                    <strong>Revenue Chart: Below the summary, there is an interactive chart to track your revenue in Daily, Weekly, or Monthly periods.</strong>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">2. Managing Transactions</AccordionTrigger>
              <AccordionContent className="space-y-4">
                 <p>
                  The Transactions page is where you record all income and expenses.
                </p>
                <div className="space-y-3">
                    <h4 className="font-semibold">Adding a New Transaction</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigate to the Transactions page from the menu.</li>
                        <li>Use the "Add Transaction" form.</li>
                        <li>Fill in all required fields:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Transaction Type: Choose "Income" or "Expense".</strong></li>
                            <li><strong>Date: The date the transaction occurred.</strong></li>
                            <li><strong>Amount: The transaction amount.</strong></li>
                            <li><strong>Category: The transaction category (e.g., "Beverage Sales", "Rent").</strong></li>
                            <li><strong>Description: A brief explanation of the transaction.</strong></li>
                             <li><strong>Payment Method: Choose "Cash", "Card", or "Online".</strong></li>
                            </ul>
                        </li>
                        <li>Click "Add Transaction" to save. The new transaction will immediately appear in the table on the right.</li>
                    </ol>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold">Editing or Deleting a Transaction</h4>
                     <ol className="list-decimal pl-6 space-y-2">
                        <li>In the "Recent Transactions" table, find the transaction you want to change.</li>
                        <li>In the "Actions" column, you will see two icons:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Pencil Icon: Click to edit. A dialog will appear with the transaction data you can change.</strong></li>
                                <li><strong>Trash Icon: Click to delete. A confirmation dialog will appear to ensure you don't delete by mistake.</strong></li>
                            </ul>
                        </li>
                        <li>Changes will be visible immediately after you save or confirm.</li>
                    </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">3. HPP (Cost of Goods Sold) Calculation</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  The HPP page helps you manage your raw material stock and calculate the cost for each product you sell. This page is divided into 3 main sections.
                </p>
                <div className="space-y-3">
                    <h4 className="font-semibold">Part 1: Add Ingredient</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Use the "Add Ingredient" form to register the materials you purchase.</li>
                        <li>
                            <strong>Fill in ingredient details:</strong>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Ingredient Name: Name for the ingredient (e.g., "Arabica Coffee Beans", "1L Full Cream Milk").</strong></li>
                                <li><strong>Total Quantity: The amount of material purchased in one transaction (e.g., 1000 for 1000 grams).</strong></li>
                                <li><strong>Unit: The unit for the quantity (e.g., gr, ml, pcs).</strong></li>
                                <li><strong>Total Price: The total price for that quantity.</strong></li>
                            </ul>
                        </li>
                         <li>
                            <strong>Example: If you buy 1 kg (1000 gr) of coffee beans for Rp 150,000, you will enter: 1000 gr, with a price of 150000. The system will automatically calculate the price per gram.</strong>
                        </li>
                        <li>Click "Add Ingredient". The ingredient will appear in the "Ingredient Stock" table.</li>
                    </ol>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold">Part 2: Ingredient Stock</h4>
                     <p>
                       This table displays all the ingredients you have added. Here, you can also edit or delete ingredients using the icons in the "Actions" column, just like on the transactions page.
                    </p>
                </div>
                <div className="space-y-3">
                    <h4 className="font-semibold">Part 3: Recipe HPP Calculator</h4>
                     <ol className="list-decimal pl-6 space-y-2">
                        <li>Select an ingredient from the "Select an ingredient..." dropdown and click "Add" to include it in the recipe.</li>
                        <li>
                           In the recipe table, enter the "Used Quantity" according to the amount needed to make one serving of the product.
                        </li>
                        <li>
                           The Total HPP (cost per product) will be calculated automatically at the bottom right. You can experiment with quantities to adjust the recipe and cost.
                        </li>
                    </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
