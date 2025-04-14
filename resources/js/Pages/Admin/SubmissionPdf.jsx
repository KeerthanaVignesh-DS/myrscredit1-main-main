import { Document, Page, Text } from "@react-pdf/renderer";
import ReportForm from "./ReportForm";

export const MyDocument = (data) => (
  <Document>
    <Page>
        <ReportForm  edit={0}  value={data} historicalpdf={data.historical_pdf} />
    </Page>
  </Document>
);