import { useEffect, useState } from 'react'
import { initMercadoPago, Payment, CardPayment } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { BackToHome } from "../../../components";
import { Loader } from "@pablo/react-components-lib";
import { useMercadoPago } from "../../../hooks/useMercadoPago";
import { checkout } from "../../../api/services/Checkout";
import getOrderStatusInfo from "../../../utils/orderStatus";
import getTransactionStatusInfo from "../../../utils/transactionStatus";

import styles from './style.module.scss'

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_API_KEY;

const mockData = {
	"data": {
		"id": "ORDTST01M6M2AFFKKWVZ5H5RAD6PTK99",
		"type": "online",
		"processing_mode": "automatic",
		"external_reference": "200",
		"total_amount": "363.35",
		"total_paid_amount": "363.35",
		"country_code": "BRA",
		"user_id": "3445855304",
		"status": "processed",
		"status_detail": "accredited",
		"capture_mode": "automatic_async",
		"currency": "BRL",
		"created_date": "2026-11-04T19:59:35.429Z",
		"last_updated_date": "2026-11-04T19:59:37.106Z",
		"integration_data": {
			"application_id": "1961563652504802"
		},
		"config": {
			"online": {
				"transaction_security": {
					"validation": "never"
				}
			}
		},
		"transactions": {
			"payments": [
				{
					"id": "PAY01M6M2AFG56RCD7JR936GPPPYM",
					"amount": "363.35",
					"paid_amount": "363.35",
					"reference_id": "000hi22g4q",
					"status": "processed",
					"status_detail": "accredited",
					"payment_method": {
						"id": "master",
						"type": "credit_card",
						"token": "abc20aa73a58bcda3eedbabed3b0ddf2",
						"installments": 1,
						"installment_amount": "363.35",
						"transaction_security": {
							"validation": "never"
						}
					}
				}
			]
		}
	}
}

export default function Status () {
    const router = useRouter();
    const { isReady } = router;
    const { payment } = router.query;
    
    const [paymentDetails, setPaymentDetails] = useState({})
    const [orderStatus, setOrderStatus] = useState({})
    const [paymentStatus, setPaymentStatus] = useState({})

    useEffect(() => {
        if(!isReady) return;

        if (payment) {
            const paymentObj = JSON.parse(payment) 
            setPaymentDetails(paymentObj)
            setOrderStatus(
                getOrderStatusInfo(paymentObj.status, paymentObj.status_detail)
            )
            setPaymentStatus(
                
            )
        }
    }, [payment, isReady])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px'
            }}
            >
               

                <div style={{
                    width: '800px',

                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px'

                }}>
                     <div
                        style={{
                            fontSize: '36pt'
                        }}
                    >
                        {orderStatus.message}
                    </div>

                    <div style={{
                        display: 'flex', 
                        borderBottom: '1px solid',
                        justifyContent: 'space-between'
                    }}
                    >
                        <div>
                            <div style={{fontSize: '12px'}}>Código da transação</div>
                            <div>{paymentDetails.id}</div>
                        </div>
                        <div>
                            <div style={{fontSize: '12px'}}>data</div>
                            <div> {paymentDetails.created_date}</div>
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end'
                    }}>

                        <div>Valor da compra: R$ {paymentDetails.total_amount}</div>
                        <div >Total pago: 
                            <span style={{color: 'green'}}> R$ {paymentDetails.total_paid_amount}</span>
                        </div>
                    </div>
                    

                    <div>
                        <div style={{
                            borderBottom: '1px solid'
                        }}>
                            Formas de pagamento:
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            borderBottom: '1px solid'
                        }}>
                            {paymentDetails?.transactions?.payments.map(item => 
                                <>
                                    <div style={{
                                        width: '100%',
                                        marginTop: '8px',
                                        backgroundColor: 'lightblue',
                                        textAlign: 'end'
                                    }}>
                                        {item.payment_method.type} {item.payment_method.id}
                                    </div>
                                    <div>Valor: R$ {item.amount}</div>
                                    <div>Valor cobrado: R$ {item.paid_amount}</div>
                                    <div >
                                        Nº de parcelas: 
                                        {item.payment_method.installments} x R$ {item.payment_method.installment_amount}
                                    </div>
                                    
                                    {/* <div>
                                        {
                                            getTransactionStatusInfo(
                                                item.status, 
                                                item.status_detail
                                            ).message
                                        }
                                    </div> */}
                                    
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-end',
                    }}>

                        <button 
                            style={{
                                border: '1px solid',
                                padding: '16px',
                                backgroundColor: 'black',
                                color: 'white',
                                width: '100%',
                            }}
                            onClick={() => router.back()}
                        > 
                            Finalizar 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}