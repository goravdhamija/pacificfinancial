import React,{useState,useEffect, useContext} from 'react';
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { PacificDataContext } from './PacificDataContext';






function ReportDownloadable() {

        const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);


        const styles = StyleSheet.create({
            page: {
              flexDirection: 'row',
              backgroundColor: '#FFFFFF'
            },
            section: {
              margin: 10,
              padding: 10,
              flexGrow: 1
            }
          });
    
        return (


    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>

);
}

export default ReportDownloadable