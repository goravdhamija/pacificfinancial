import { PDFViewer } from "@react-pdf/renderer";
import ReportDownloadable from "./ReportDownloadable";

    function PDFReportView() {
      return (
        <div>
          <PDFViewer width="1000" height="650" className="app" >
            <ReportDownloadable />
          </PDFViewer>
        </div>
      );
    }

export default PDFReportView;