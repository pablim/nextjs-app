import React, { useState } from "react";
import { useRouter } from 'next/navigation'

import { 
    QRCodeScan, BackToHome, Message, Logout 
} from "../../../../components";

import { 
    getLoyaltyCard, redeemLoyaltyCard 
} from "../../../../api/services/Loyalty";

import styles from "./styles/styles.module.scss";

export default function RedeemLoyaltyCard() {
    const [card, setCard] = useState({})
    const [cardId, setCardId] = useState()
    const [showActions, setShowActions] = useState(false)
    const [msgs, setMsgs] = useState([])
    const router = useRouter()

    const onNewScanResult = (decodedText, decodedResult) => {
        // handle decoded results here
        const parts = decodedText.split(".")
        const name = parts[3]
        const id = `${parts[0]}.${parts[1]}.${parts[2]}`

        getLoyaltyCard({cardId: id}).then((data) => {
            if (data.data.results.data.state === 'active') {
                setCard(data.data.results.data)
                setCardId(id)
                setShowActions(true)
                setMsgs([])
            } else {
                confirm(`Cartão já expirado ou resgatado.`)
            }
        }).catch((err) => {

        })
    };

    const redeemCard = () => {
        const {int: points, money} = card.loyaltyPoints.balance
    
        const pointsValue = money ? `R$ ${(money.micros / 1000000)} de cashback` : `${points} pontos`
        
        if (confirm(`Resgatar cartão fidelidade de ${card.accountName} com ${pointsValue}?`)) {
            redeemLoyaltyCard({cardId: cardId, state: 'EXPIRED'})
            .then((response) => {
                setMsgs(response.data.msgs)
            }).catch((err) => {})
        }
    }

    return (
        <div className={styles.container}>
            <BackToHome />
            <Logout />
            <Message msgs={msgs} />
            <div className={styles.qrReaderContainer}>
                <QRCodeScan onNewScanResult={onNewScanResult} />
            </div>

            {showActions && 
                <div className={styles.actionsContainer}>
                    <div>{card.accountName}</div>
                    <div className={styles.updateActions}>
                        
                        
                    </div>
                    <div className={styles.redeemAction}>
                        <div>Resgate</div>
                        <button onClick={redeemCard}>Resgatar</button>
                    </div>
                </div>
            }
        </div>
    );
}