import React,{useState,useEffect, useContext} from 'react';
import { Image, Text, View, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PacificDataContext } from './PacificDataContext';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Alert,Form,Row,Col,InputGroup,FloatingLabel,Button,ListGroup ,Modal, Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { pv,fv, pmt } from 'financial'
import { PV, CUMIPMT } from '@formulajs/formulajs'
import { LiabilityInputComponent } from './LiabilitiesFormComponents';
import { NewLoanProposalComponent } from './NewLoanProposal';
import { AlertHeaderLoans,AlertHeaderLiabilities,AlertHeaderProposals,AlertFooterPage } from './AlertComponents';
import ReactPDF from '@react-pdf/renderer';
import PDFReportView from './PDFReportView';
import { NumericFormat } from 'react-number-format';



function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}.${date}.${year}`;
  }

function ReportDownloadable(props) {

        // const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

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

        tableTitle: { paddingLeft: 5,paddingTop: 5,width:'100%',marginTop: 30 ,fontSize: 12,fontStyle: 'bold',backgroundColor : '#36454F', color: '#FFFFFF',  textAlign: 'left', textDecoration: 'underline'  },

        addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
        
        invoice : {fontWeight: 'bold',fontSize: 20},
        
        invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
        
        address : { fontWeight: 400, fontSize: 10},
        
        theader : {marginTop : 1,fontSize : 9,paddingTop: 4 ,paddingLeft: 2 ,flex:1, textAlign: 'center',backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

        tbody : {marginTop : 1,fontSize : 9,paddingTop: 4 ,paddingLeft: 2 ,flex:1,paddingRight: 4, textAlign: 'right',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},


        // tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 2 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

        total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{ flex:2, borderRightWidth:1, },

        planContainer:{  borderBottomWidth:4,paddingBottom: 15, },
        planTitle:{ borderBottomWidth:1,paddingLeft: 5,paddingTop: 5,width:'100%',marginTop: 20 ,fontSize: 10,fontStyle: 'normal',  textAlign: 'left'   },
        planDetail:{ borderWidth:0,borderColor : '#0000FF',width:'100%', flexDirection :'row' },
        planBlock:{ borderWidth:0,borderColor : '#00FF00',flexDirection: 'column' },
        planHeader:{ paddingLeft: 5,paddingTop: 5,backgroundColor : '#708090', color: '#FFFFFF',  textAlign: 'left',marginTop:5,fontSize: 10,fontStyle: 'normal' },
        planContent:{ width:'100%', flexDirection :'row', margin:2 },
        planField:{ flex:2, marginRight:5, textAlign: 'right',fontSize: 10,fontStyle: 'bold'},
        planValue:{ flex:1, marginRight:10, textAlign: 'right',fontSize: 10,fontStyle: 'normal'}

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
                
                    <Text >Prepared By: {props.report.reportPreparedBy}</Text>
                    <Text >Prepared For: {props.report.reportPreparedFor}</Text>
            </View>

            <Text >Date: {getDate()}</Text>
            </View>
        );


        const LoanTableHead = () => (
            <View style={{ width:'100%', flexDirection :'row', marginTop:2}}>
                <View style={[styles.theader,{flex:.7}]}>
                    <Text >No.</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Amount</Text>   
                </View>
                <View style={[styles.theader,{flex:.7}]}>
                    <Text>Term</Text>   
                </View>
                <View style={[styles.theader,{flex:.7}]}>
                    <Text>Rate of interest</Text>   
                </View>
                <View style={[styles.theader,{flex:.7}]}>
                    <Text>No. of Payments Made</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Payment Per Month</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Balance</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Interest</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Paid (Interest)</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Remaining (Interest)</Text>   
                </View>
                <View style={[styles.theader,{flex:1.3}]}>
                    <Text>Principal Amount</Text>   
                </View>
                <View style={[styles.theader,{flex:.7}]}>
                    <Text>Years Left</Text>   
                </View>
                <View style={[styles.theader,{flex:.7}]}>
                    <Text>Deductible %</Text>   
                </View>
                <View style={[styles.theader,{flex:1}]}>
                    <Text>Deductible Amount</Text>   
                </View>
            </View>
        );

     //   console.log(JSON.stringify(loans));

         const LoanTableBody = (internProperties) => (
            
            <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                 <View style={[styles.tbody,{flex:.7}]}>
                 <Text>{internProperties.loan.index+1}</Text>   
                    
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                 <Text >{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.loanAmount)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:.7}]}>
                     <Text>{internProperties.loan.loan.termYears}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:.7}]}>
                     <Text>{internProperties.loan.loan.interestRate}%</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:.7}]}>
                     <Text>{internProperties.loan.loan.numberOfpaymentsMade}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.currentPayment)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.currentBalance)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.totalInterest)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.interestPaid)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.remainingInterest)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1.3}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.remainingPrincipal)}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:.7}]}>
                     <Text>{internProperties.loan.loan.yearsLeft}</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:.7}]}>
                     <Text>{internProperties.loan.loan.deductible}%</Text>   
                 </View>
                 <View style={[styles.tbody,{flex:1}]}>
                     <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.loan.loan.deductibleCost)}</Text>   
                 </View>
             </View>

         );

        

        const LiabilityTableHead = () => (
            <View style={{ width:'100%', flexDirection :'row', marginTop:2}}>
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


       function renderLiabilityMode(param) {
            switch(param) {
              case 1:
                return 'Card';
                case 2:
                return 'Auto';
                case 3:
                return 'Cashout';
            
              default:
                return 'Other';
            }
          }


        const LiabilityTableBody = (internProperties) => {
            var mode = "Card";


            
            return (

            <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                <View style={[styles.tbody]}>
                <Text>{internProperties.liability.index+1}</Text>      
                </View>
                <View style={styles.tbody}>
                    <Text>{renderLiabilityMode(internProperties.liability.liability.liabilityType)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.liability.liability.balanceAmount)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{internProperties.liability.liability.interestRate}%</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.liability.liability.monthlyPayment)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{internProperties.liability.liability.payoffYears}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(internProperties.liability.liability.interest)}</Text>   
                </View>
                
                
            </View>
        );
    }

        
    
        return (


    <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
    <View style={styles.section}>
        {/* <DocTitle/> */}
        <View style={styles.insidePageContainer}>
        <DocTitle/>
        <DocDescription/>
        
        <Text style={styles.tableTitle}>Loans</Text>
        <LoanTableHead/>
        {props.loans.map((loan, index) => (
            <LoanTableBody loan={{loan, index}} />
        ))}

        <Text style={styles.tableTitle}>Liabilities</Text>
        <LiabilityTableHead/>
        {props.liabilities.map((liability, index) => (
            <LiabilityTableBody liability={{liability, index}} />
        ))}

       


       {/* </View>
    </View>
    </Page>
            
    


   <Page size="A4" orientation="landscape" style={styles.page}>
    <View style={styles.section}>
    <View style={styles.insidePageContainer}> */}
        
    <Text style={styles.tableTitle}>Loan Proposals</Text>
        {props.proposals.map((proposal, index) => (
        <View style={styles.planContainer}>
           
            <Text style={styles.planTitle}>
                Plan No. {index+1} for term {proposal.proposalTerm} years with an interest rate of {proposal.proposalInterestRate}% per annum.
            </Text>
            
            <View style={[styles.planDetail]}>
                <View style={[styles.planBlock,{ marginLeft:20, width:'31%'}]}>
                    <Text style={styles.planHeader}>
                        Refinancing Liabilities
                        </Text>

                        
                        {
                            proposal.payoffLoans.map((proposalLoanID, index) => {
                              var getMatchedLoan = props.loans.filter(loan => loan.loanid === proposalLoanID);
                                
                            return(
                                    <View  style={styles.planContent}>
                                        <Text style={styles.planField}>
                                        Loan - ({index+1}) Balance:
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(getMatchedLoan[0].currentBalance)}
                                        </Text>
                                    </View>
                                    );
                                }
                            )
                        }


                        {
                            proposal.payoffLiabilities.map((proposalLiabilityID, index) => {
                                var getMatchedLoan = props.liabilities.filter(liability => liability.liabilityid === proposalLiabilityID);
                                
                            return(
                                    <View  style={styles.planContent}>
                                        <Text style={styles.planField}>
                                        Liability - ({index+1}) Balance:
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(getMatchedLoan[0].balanceAmount)}
                                        </Text>
                                    </View>
                                    );
                                }
                            )
                        }

                                    <View  style={[styles.planContent,{borderTopWidth:1}]}>
                                        <Text style={styles.planField}>
                                        Total PayOff Selected Balance:
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.totalPayOff)}
                                        </Text>
                                    </View>


                </View>
                <View style={[styles.planBlock,{ marginLeft:20, width:'31%'}]}>
                    <Text style={styles.planHeader}>
                        Loan Amount Sought
                        </Text>

                                    <View  style={styles.planContent}>
                                        <Text style={styles.planField}>
                                        Origination Fees ({proposal.proposalOriginationFeesRate}%) :
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.proposalOriginationFees)}
                                        </Text>
                                    </View>

                                    <View  style={styles.planContent}>
                                        <Text style={styles.planField}>
                                        Discount Fees ({proposal.proposalDiscountFeesRate}%) :
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.proposalDiscountFees)}
                                        </Text>
                                    </View>

                                    <View  style={styles.planContent}>
                                        <Text style={styles.planField}>
                                        Escrow/Misc. Fees :
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.proposalMiscFees)}
                                        </Text>
                                    </View>

                                    <View  style={styles.planContent}>
                                        <Text style={styles.planField}>
                                        Lender Credit ({proposal.proposalLenderCreditRate}%) :
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.proposalLenderCredit)}
                                        </Text>
                                    </View>

                                    <View  style={[styles.planContent,{borderTopWidth:1}]}>
                                        <Text style={[styles.planField,{ textDecoration: proposal.inCC == 1 ? '':'line-through'}]}>
                                        Total Fees :
                                        </Text>
                                        <Text style={[styles.planValue,{textDecoration: proposal.inCC == 1 ? '':'line-through'}]}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.total)}
                                        </Text>
                                    </View>

                                    <View  style={[styles.planContent]}>
                                        <Text style={styles.planField}>
                                        Total PayOff Selected Balance:
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.totalPayOff)}
                                        </Text>
                                    </View>

                                    <View  style={[styles.planContent,{borderTopWidth:1,fontWeight: '900'}]}>
                                        <Text style={[styles.planField,{fontWeight: '900'}]}>
                                        Proposed New Loan Amount:
                                        </Text>
                                        <Text style={styles.planValue}>
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.newProposalLoanAmount)}
                                        </Text>
                                    </View>
                </View>

                <View style={[styles.planBlock,{ marginLeft:20, width:'31%'}]}>
                    <Text style={styles.planHeader}>
                        Financial Gains 
                    </Text>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                            New Monthly Payment:
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.newPayment)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                           APR:
                        </Text>
                        <Text style={styles.planValue}>
                            {proposal.apr}%
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Net Savings (Per Month):
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.netSavingsPM)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Term Reduction:
                        </Text>
                        <Text style={styles.planValue}>
                            {proposal.termReduction}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Total Interest On New Loan:
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.totalNewInterest)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Interest Saved/Lost:
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.interestSavedLost)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Tax Benefit - Bracket:
                        </Text>
                        <Text style={styles.planValue}>
                            {proposal.taxBenefitBracket}%
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Tax Benefit New:
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.taxBenefitNew)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Tax Benefit Previous:
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.taxBenefitPrevious)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField,{textDecoration: proposal.investCashoutCheck == 1 ? '':'line-through'}]}>
                        Invest Cashout:
                        </Text>
                        <Text style={[styles.planValue,{textDecoration: proposal.investCashoutCheck == 1 ? '':'line-through'}]}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.investCashoutAmount)}
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField]}>
                        Rate Of Interest on Invest:
                        </Text>
                        <Text style={styles.planValue}>
                            {proposal.rateOnInvest}%
                        </Text>
                    </View>

                    <View  style={[styles.planContent]}>
                        <Text style={[styles.planField,{textDecoration: proposal.investMonthlyCheck == 1 ? '':'line-through'}]}>
                        Invest Monthly Savings:
                        </Text>
                        <Text style={[styles.planValue,{textDecoration: proposal.investMonthlyCheck == 1 ? '':'line-through'}]}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.investMonthlyAmount)}
                        </Text>
                    </View>

                    <View  style={styles.planContent}>
                        <Text style={styles.planField}>
                            Benefit After {proposal.benefitYears} Year's:
                        </Text>
                        <Text style={styles.planValue}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proposal.benefitAfterNYears)}
                        </Text>
                    </View>


                </View>

            </View>
        </View>
         ))}


        </View>
    </View>
    </Page>


  </Document>

);
}

export default ReportDownloadable