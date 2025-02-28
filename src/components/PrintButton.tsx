import { PrinterIcon } from "@heroicons/react/24/solid";

function PrintButton() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed bottom-4 left-4 xl:bottom-8 xl:left-auto xl:right-4 z-50 print:hidden">
            <button
                onClick={handlePrint}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition shadow-md lg:px-2 lg:py-2"
                aria-label="Print Resume"
            >
                <PrinterIcon className="h-6 w-6" />
                <span className="hidden xl:inline ml-2">Print Resume</span>
            </button>
        </div>
    );
}

export default PrintButton;