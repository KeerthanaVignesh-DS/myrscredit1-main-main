// MyDocument.js
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: 48,
    color: 'rgba(169, 169, 169, 0.2)',
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderBottom: '1 solid #000',
    paddingBottom: 10,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTop: '1 solid #000',
    paddingTop: 10,
    fontSize: 10,
    color: 'grey',
  },
  content: {
    marginTop: 60,
    marginBottom: 80,
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Text style={styles.watermark} fixed>
        CONFIDENTIAL
      </Text>
      
      {/* Header */}
      <View style={styles.header} fixed>
        <Text>Myrs Credit Advisors, Inc.</Text>
        <Text style={{ marginTop: 5 }}>Credit Report</Text>
        <Text style={{ marginTop: 5, fontSize: 10 }}>
          Generated on: {new Date().toLocaleDateString()}
        </Text>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Your existing report content here */}
        <ReportForm edit={0} value={data} historicalpdf={data?.historical_pdf} ispdf={1} />
      </View>
      
      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text>Page 1 of 1</Text>
        <Text style={{ marginTop: 5 }}>© {new Date().getFullYear()} Myrs Credit Advisors, Inc. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;