import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { toast } from "sonner";

function DownloadButton({ selectedDate, filteredData }) {
  const toastError = () => {
    toast.error("No data to download");
  };

  const handleDownload = () => {
    const selectedMonth = selectedDate.from
      ? selectedDate.from.getMonth()
      : null;
    const selectedYear = selectedDate.from
      ? selectedDate.from.getFullYear()
      : null;

    if (selectedMonth === null || selectedYear === null) {
      toastError();
      return;
    }

    if (!filteredData || filteredData.length === 0) {
      toastError();
      toast;
      return;
    }

    const doc = new jsPDF();

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const formatTitle = (selectedMonth) => {
      const date = new Date();
      date.setMonth(selectedMonth);
      date.setFullYear(selectedYear);
      date.setDate(1);

      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `ACCOMPLISHMENT REPORT FOR THE MONTH OF ${month.toUpperCase()} ${year}`;
    };

    const title = formatTitle(selectedMonth);

    const sortedData = filteredData.sort((a, b) =>
      a.type.localeCompare(b.type)
    );

    const tableData = sortedData.map((item) => {
      const splitAccomplishment = doc.splitTextToSize(item.accomplishment, 60);
      const joinedAccomplishment = splitAccomplishment.join("\n");
      const remarks =
        item.remarks.charAt(0).toUpperCase() +
        item.remarks.slice(1).toLowerCase();
      return [item.type, joinedAccomplishment, formatDate(item.date), remarks];
    });

    const itemsPerPage = 14;
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) {
        doc.addPage();
      }

      doc.setFontSize(16); // Ensure the title font size is consistent
      doc.text(title, 105, 30, { align: "center" });

      const startItemIndex = pageIndex * itemsPerPage;
      const endItemIndex = Math.min(
        startItemIndex + itemsPerPage,
        tableData.length
      );
      const pageData = tableData.slice(startItemIndex, endItemIndex);

      autoTable(doc, {
        startY: 40,
        body: pageData,
        head: [["Type", "Accomplishment", "Date", "Remarks"]],
        styles: { fontSize: 12 },
      });

      if (pageIndex === 0) {
        const pageHeight =
          doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text("Prepared By:", 40, pageHeight - 50);
        doc.text("MECHAELA F. BABIERA", 40, pageHeight - 40);
        doc.text("Support Staff", 46, pageHeight - 35);

        doc.text(
          "RHODA N. MOLBOG",
          doc.internal.pageSize.width / 2 + 30,
          pageHeight - 40,
          { align: "center" }
        );
        doc.text(
          "Head BAO",
          doc.internal.pageSize.width / 2 + 30,
          pageHeight - 35,
          { align: "center" }
        );
      }
    }

    doc.save("accomplishment_report.pdf");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Download</Button>
        </PopoverTrigger>
        <PopoverContent>
          <span className="text-sm text-gray-500">
            Download the report for the selected month
          </span>
          <div className="flex items-end justify-center gap-2 mt-2">
            <PopoverClose>
              <Button variant="outline">Cancel</Button>
            </PopoverClose>
            <Button onClick={handleDownload} isDisabled={!selectedDate?.from}>
              Download
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

DownloadButton.propTypes = {
  selectedDate: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }).isRequired,
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      accomplishment: PropTypes.string.isRequired,
      remarks: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DownloadButton;