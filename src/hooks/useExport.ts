import { useCallback } from "react";
import { toast } from "react-hot-toast";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  time?: string;
  status: "completed" | "pending" | "failed";
  category: string;
  method: string;
  recipient?: string;
  sender?: string;
  reference?: string;
  fee?: number;
  balance?: number;
}

interface UseExportReturn {
  exportTransactionsToCSV: (transactions: Transaction[]) => void;
  exportTransactionsToJSON: (transactions: Transaction[]) => void;
  exportTransactionsPDF: (transactions: Transaction[]) => void;
}

export const useExport = (): UseExportReturn => {
  const exportTransactionsToCSV = useCallback((transactions: Transaction[]) => {
    try {
      if (!transactions || transactions.length === 0) {
        toast.error("No transactions to export");
        return;
      }

      // Define CSV headers
      const headers = [
        "Transaction ID",
        "Date",
        "Time",
        "Type",
        "Description",
        "Amount",
        "Category",
        "Status",
        "Method",
        "Recipient",
        "Sender",
        "Reference",
        "Fee",
        "Balance",
      ];

      // Convert transactions to CSV rows
      const csvRows = transactions.map((transaction) => [
        transaction.id,
        transaction.date,
        transaction.time || "",
        transaction.type,
        transaction.description,
        transaction.amount.toString(),
        transaction.category,
        transaction.status,
        transaction.method,
        transaction.recipient || "",
        transaction.sender || "",
        transaction.reference || "",
        transaction.fee?.toString() || "",
        transaction.balance?.toString() || "",
      ]);

      // Combine headers and rows
      const csvContent = [headers, ...csvRows]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `transactions_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`${transactions.length} transactions exported to CSV`);
    } catch (error) {
      console.error("Error exporting transactions to CSV:", error);
      toast.error("Failed to export transactions to CSV");
    }
  }, []);

  const exportTransactionsToJSON = useCallback(
    (transactions: Transaction[]) => {
      try {
        if (!transactions || transactions.length === 0) {
          toast.error("No transactions to export");
          return;
        }

        const jsonContent = JSON.stringify(transactions, null, 2);
        const blob = new Blob([jsonContent], {
          type: "application/json;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `transactions_${new Date().toISOString().split("T")[0]}.json`
        );
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(`${transactions.length} transactions exported to JSON`);
      } catch (error) {
        console.error("Error exporting transactions to JSON:", error);
        toast.error("Failed to export transactions to JSON");
      }
    },
    []
  );

  const exportTransactionsPDF = useCallback((transactions: Transaction[]) => {
    try {
      if (!transactions || transactions.length === 0) {
        toast.error("No transactions to export");
        return;
      }

      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Transaction Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .amount { text-align: right; }
            .status-completed { color: #28a745; }
            .status-pending { color: #ffc107; }
            .status-failed { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1>Transaction Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Transactions: ${transactions.length}</p>
          
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              ${transactions
                .map(
                  (transaction) => `
                <tr>
                  <td>${transaction.id}</td>
                  <td>${transaction.date}</td>
                  <td>${transaction.description}</td>
                  <td>${transaction.type}</td>
                  <td class="amount">${transaction.amount.toLocaleString()}</td>
                  <td class="status-${transaction.status}">${
                    transaction.status
                  }</td>
                  <td>${transaction.category}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;

      // Create and download HTML file (can be printed as PDF)
      const blob = new Blob([htmlContent], {
        type: "text/html;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `transactions_report_${new Date().toISOString().split("T")[0]}.html`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(
        `Transaction report generated. Open the HTML file and print to PDF`
      );
    } catch (error) {
      console.error("Error generating PDF report:", error);
      toast.error("Failed to generate PDF report");
    }
  }, []);

  return {
    exportTransactionsToCSV,
    exportTransactionsToJSON,
    exportTransactionsPDF,
  };
};
