import { Document, Page, Text } from "@react-pdf/renderer";

export const MyDocument = () => (
  <Document>
    <Page>
      <Text>Hello, this is your PDF!</Text>
    </Page>
  </Document>
);