import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchEmployees } from "./helper";

const PrintableForm = () => {
  const [tailorName, setTailorName] = useState("");
  const [tailors, setTailors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const fetchedEmployees = await fetchEmployees();
        setTailors(fetchedEmployees);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    getEmployees();
  }, []);

  const handlePrint = () => {
    if (!tailorName) {
      toast.error("Please add the name of the sewer");
      return;
    }

    const printContent = document
      .getElementById("printableContent")
      .innerHTML.replace("{sewerName}", tailorName);

    // Create a temporary print area
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `
      <html>
          <head>
              <style>
                  @page {
                      size: landscape;
                      margin: 10mm;
                  }
                  body {
                      font-family: Arial, sans-serif;
                      width: 100%;
                      height: 100%;
                      margin: 0;
                      padding: 0;
                      background-color: #ffff;
                      color: #000;
                  }
                  table {
                      border-collapse: collapse;
                      width: 100%;
                      font-size: 10px;
                  }
                  th, td {
                      border: 1px solid black;
                      padding: 15px;
                      text-align: center;
                  }
                  th {
                      background-color: #800000;
                      color: white;
                  }
                  h2 {
                      color: #800000;
                  }
                  @media print {
                      header, footer {
                          display: none;
                      }
                  }
              </style>
          </head>
          <body>
              ${printContent}
          </body>
      </html>
    `;

    // Trigger the print dialog
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to reset the React state and DOM
  };

  // Get the current month and year
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[date.getMonth()]; // Get the current month name
  const currentYear = date.getFullYear(); // Get the current year

  return (
    <div className="container">
      <Button
        id="printButton"
        className="h-8"
        onClick={() => setIsDialogOpen(true)}
        variant="secondary"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>

      {/* Dialog for entering sewer name */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Tailor Name</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="mt-3">
            <Select onValueChange={setTailorName} value={tailorName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a tailor" />
              </SelectTrigger>
              <SelectContent>
                {tailors.map((tailor) => (
                  <SelectItem key={tailor.id} value={tailor.name}>
                    {tailor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-col items-center gap-4 mt-4">
              <AlertDialogFooter className="w-full flex flex-col items-center gap-4">
                <AlertDialogCancel asChild>
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <Button
                  onClick={() => {
                    if (tailorName) {
                      handlePrint();
                      setIsDialogOpen(false);
                    } else {
                      toast.error("Please add the name of the sewer");
                    }
                  }}
                  type="submit"
                  className="w-full flex items-center justify-center"
                >
                  Confirm
                </Button>
              </AlertDialogFooter>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Hidden content for printing */}
      <div style={{ display: "none" }}>
        <div id="printableContent">
          <div className="header text-center mb-5">
            <h2 className="text-lg font-semibold">Production Details Form</h2>
            <p className="text-sm">
              For the Month of: {currentMonth} {currentYear}
            </p>
            <p className="text-sm">Tailor Name: {tailorName || "N/A"}</p>{" "}
          </div>

          <table>
            <thead>
              <tr>
                <th colSpan="6">Production Details</th>
                <th colSpan="2">Raw Materials Used</th>
              </tr>
              <tr>
                <th>Level</th>
                <th>Product Type</th>
                <th>Size</th>
                <th>Production Date From</th>
                <th>Production Date To</th>
                <th>Quantity</th>
                <th>Raw Material Type</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ backgroundColor: "#f7f7f7" }}>COLLEGE</td>
                <td style={{ backgroundColor: "#f7f7f7" }}>POLO</td>
                <td style={{ backgroundColor: "#f7f7f7" }}>S16</td>
                <td style={{ backgroundColor: "#f7f7f7" }}>JANUARY 4, 2024</td>
                <td style={{ backgroundColor: "#f7f7f7" }}>JANUARY 10, 2024</td>
                <td style={{ backgroundColor: "#f7f7f7" }}>6</td>
                <td style={{ backgroundColor: "#f7f7f7" }}>
                  CVC WHITE, CVC WHAT, ANOTHER MATERIAL
                </td>
                <td style={{ backgroundColor: "#f7f7f7" }}>2, 4, 10</td>
              </tr>

              {Array.from({ length: 15 }).map((_, index) => (
                <tr key={index}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintableForm;
