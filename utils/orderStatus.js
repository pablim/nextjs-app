
// https://www.mercadopago.com.mx/developers/pt/docs/checkout-api-orders/payment-management/status/order-status
// Mapa de status das orders do Mercado Pago (Orders API).
// Para cada par status -> status_detail:
//   description: texto original da documentação (uso interno/logs)
//   message:     mensagem amigável para mostrar ao usuário
//   retry:       true  = vale oferecer uma NOVA tentativa (novo token, nova order)
//                false = não ofereça nova tentativa (aguarde, ou já está resolvido)

export const ORDER_STATUS = {
  created: {
    created: {
      description: "A order foi criada com sucesso. Nesse momento, ainda não foi iniciada nenhuma ação de processamento, e a order está no status inicial de espera.",
      message: "Estamos iniciando o seu pagamento. Aguarde um instante.",
      retry: false,
    },
  },

  processed: {
    accredited: {
      description: "A order foi processada com sucesso e o pagamento foi creditado.",
      message: "Pagamento aprovado! Obrigado pela sua compra.",
      retry: false,
    },
    partially_refunded: {
      description: "A order foi processada e uma parte do valor foi reembolsada. Isso indica que, embora a transação tenha sido concluída, houve um reembolso parcial do valor pago em favor do pagador.",
      message: "Parte do valor deste pagamento foi reembolsada.",
      retry: false,
    },
  },

  processing: {
    in_process: {
      description: "A order está em processamento. Isso significa que a transação está em andamento e ainda não foi concluída. Esse status também pode ser retornado em caso da criação de pagamentos de forma assíncrona.",
      message: "Estamos processando o seu pagamento. Isso pode levar alguns instantes.",
      retry: false,
    },
  },

  action_required: {
    waiting_payment: {
      description: "A order requer uma ação adicional do pagador e está aguardando o pagamento. Isso significa que a transação foi iniciada, mas o pagamento ainda não foi concluído.",
      message: "Aguardando o pagamento. Conclua-o para finalizar a sua compra.",
      retry: false,
    },
    waiting_capture: {
      description: "A order requer uma ação adicional do vendedor e está aguardando a captura do pagamento. Isso significa que o pagamento foi autorizado, mas ainda não foi capturado.",
      message: "Pagamento autorizado. Estamos confirmando a sua compra.",
      retry: false,
    },
    waiting_transfer: {
      description: "A order requer uma ação adicional do pagador e está aguardando a transferência dos valores. Isso significa que o pagamento foi iniciado, mas os valores ainda não foram transferidos para a conta do vendedor.",
      message: "Aguardando a confirmação da transferência. Se você já pagou, aguarde alguns instantes.",
      retry: false,
    },
    waiting_retry: {
      description: "A order está na janela de nova tentativa automática após uma cobrança que falhou; uma nova tentativa de pagamento está agendada antes de atingir o número máximo de tentativas configurado.",
      message: "Não conseguimos concluir a cobrança agora. Faremos uma nova tentativa automaticamente.",
      retry: false, // o próprio Mercado Pago tenta de novo; não crie outra order
    },
  },

  canceled: {
    canceled: {
      description: "A order foi cancelada e não será concluída.",
      message: "Este pagamento foi cancelado. Você pode iniciar um novo pagamento.",
      retry: true,
    },
    expired: {
      description: "A order expirou e foi cancelada.",
      message: "O tempo para pagar acabou. Gere um novo pagamento para continuar.",
      retry: true,
    },
  },

  charged_back: {
    in_process: {
      description: "A order sofreu uma contestação. Isso significa que uma das transações da ordem foi contestada e está em processo de avaliação.",
      message: "Este pagamento foi contestado e está em análise.",
      retry: false,
    },
    settled: {
      description: "A order sofreu uma contestação. Isso significa que a transação foi liquidada. Isso pode ocorrer quando o valor da transação foi processado e confirmado.",
      message: "A contestação deste pagamento foi analisada e concluída.",
      retry: false,
    },
    reimbursed: {
      description: "A order sofreu uma contestação. Isso significa que a transação foi reembolsada e o valor da transação foi devolvido ao pagador após o estorno.",
      message: "O valor deste pagamento foi devolvido após a contestação.",
      retry: false,
    },
  },

  failed: {
    expired: {
      description: "A order expirou e falhou.",
      message: "O tempo para concluir o pagamento acabou. Tente novamente.",
      retry: true,
    },
    failed: {
      description: "A order falhou. Isso significa que a transação não foi bem-sucedida e não será concluída.",
      message: "Não foi possível concluir o pagamento. Tente novamente ou use outra forma de pagamento.",
      retry: true,
    },
  },

  refunded: {
    refunded: {
      description: "A order foi reembolsada. Isso significa que o valor da transação foi devolvido integralmente ao pagador.",
      message: "O valor deste pagamento foi devolvido integralmente.",
      retry: false,
    },
  },
};

// Status desconhecido: mensagem neutra e SEM nova tentativa,
// para evitar cobrança em duplicidade enquanto você investiga.
const DESCONHECIDO = {
  description: "Status não mapeado.",
  message: "Estamos verificando o seu pagamento. Avisaremos assim que houver uma atualização.",
  retry: false,
};

export default function getOrderStatusInfo(status, statusDetail) {
  const grupo = ORDER_STATUS[status];
  if (!grupo) return DESCONHECIDO;
  // se o detalhe não existir, tenta o detalhe de mesmo nome do status (ex.: failed/failed)
  return grupo[statusDetail] ?? grupo[status] ?? DESCONHECIDO;
}
