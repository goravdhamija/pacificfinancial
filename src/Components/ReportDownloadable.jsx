import React,{useState,useEffect, useContext} from 'react';
import { Image, Text, View, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PacificDataContext } from './PacificDataContext';
import logo from '../pacific-financial-logo.jpg';




function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}.${date}.${year}`;
  }

function ReportDownloadable() {

        const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

       // Font.register({ family: 'Helvetica', src: source, fontStyle: 'normal', fontWeight: 'normal', fonts?: [] });
        const styles = StyleSheet.create({
            // page: {
            //   flexDirection: 'row',
            //   backgroundColor: '#FFFFFF'
            // },
            section: {
              margin: 2,
              padding: 2,
              flexGrow: 1,
              flexDirection: 'column'
            },
            logo: {
                height: 30,
                width: 110
            },

        page: {fontSize: 11,paddingTop: 10,paddingLeft: 10,paddingRight: 10,lineHeight: 1.5,flexDirection: 'column' },

        spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

        titleContainer: {flexDirection: 'row',marginTop: 4},
        insidePageContainer: {marginTop: 10, flexDirection: 'column',border: 'solid 0.3em' , borderColor: 'red' , marginLeft:30 , marginRight:30},

        generalContainerVertical: {marginTop: 0, flexDirection: 'column',border: 'solid 0.3em' , borderColor: 'red'},
        generalContainerHorizontal: {marginTop: 10, flexDirection: 'row',border: 'solid 0.3em' , borderColor: 'red',justifyContent:'space-between'},
        
        reportTitle: {  fontSize: 16,fontStyle: 'bold', color: '#064bba',  textAlign: 'center', textDecoration: 'underline', textDecorationColor: 'green' },

        addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
        
        invoice : {fontWeight: 'bold',fontSize: 20},
        
        invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
        
        address : { fontWeight: 400, fontSize: 10},
        
        theader : {marginTop : 20,fontSize : 6,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

        tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

        total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{ flex:2, borderRightWidth:1, }

          });


          const DocTitle = () => (
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Image style={styles.logo} src={logo} />
                    <Text style={styles.reportTitle}>Pacific Financial Mortgage Report</Text>
                </View>
            </View>
        );

        const DocDescription = () => (
            <View style={styles.generalContainerHorizontal}>
            <View style={styles.generalContainerVertical}>
                
                    <Text >Prepared By: Bill Moran</Text>
                    <Text >Prepared For: Castillo</Text>
            </View>

            <Text >Date: {getDate()}</Text>
            </View>
        );


        const LoanTableHead = () => (
            <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                <View style={[styles.theader]}>
                    <Text >No.</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Amount</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Term</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Rate</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Payments</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Per Month</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Balance</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Interest</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Paid</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Remaining</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Principal</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>YearsLeft</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>DED-%</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>DED-$</Text>   
                </View>
            </View>
        );


        const LiabilityTableHead = () => (
            <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                <View style={[styles.theader]}>
                    <Text >No.</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Mode</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Balance</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Rate</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Payments</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Pay Off</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Interest</Text>   
                </View>
                
                
            </View>
        );


        
    
        return (


    <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.section}>
        <DocTitle/>
        <View style={styles.insidePageContainer}>
        
        <DocDescription/>
        <LoanTableHead/>
        <LiabilityTableHead/>
       </View>
    </View>
    {/* <View style={styles.section}>
    <TableHead/>
    </View> */}
      {/* <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View> */}
    </Page>
  </Document>

);
}

export default ReportDownloadable