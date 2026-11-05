
// https://www.mercadopago.com.mx/developers/pt/docs/checkout-api-orders/payment-management/status/transaction-status
// Mapa de status das TRANSAÇÕES (pagamentos dentro da order) do Mercado Pago.
// Para cada par status -> status_detail:
//   description: texto original da documentação (uso interno/logs)
//   message:     mensagem amigável para mostrar ao usuário
//   retry:       true  = vale oferecer uma NOVA tentativa (novo token, nova order)
//                false = não ofereça nova tentativa (aguarde, ou já está resolvido)

export const TRANSACTION_STATUS = {
  created: {
    created: {
      description: "A transação foi criada com sucesso, mas ainda não foi processada. Este é o status inicial de uma transação após sua criação.",
      message: "Estamos iniciando o seu pagamento. Aguarde um instante.",
      retry: false,
    },
  },

  processed: {
    accredited: {
      description: "A transação foi processada com sucesso e o valor foi efetivamente creditado.",
      message: "Pagamento aprovado! Obrigado pela sua compra.",
      retry: false,
    },
    partially_refunded: {
      description: "A transação foi processada com sucesso e uma parte do valor foi reembolsada. Isso indica que, embora a transação tenha sido concluída, houve um reembolso parcial do valor pago em favor do pagador.",
      message: "Parte do valor deste pagamento foi reembolsada.",
      retry: false,
    },
  },

  processing: {
    in_process: {
      description: "A transação está em processamento. Isso significa que a transação está em andamento e ainda não foi concluída.",
      message: "Estamos processando o seu pagamento. Isso pode levar alguns instantes.",
      retry: false,
    },
    pending_review_manual: {
      description: "A transação está em andamento. Este status detalha que está aguardando uma revisão manual. Isso geralmente acontece quando a order precisa de uma avaliação adicional antes de prosseguir.",
      message: "Seu pagamento está em análise. Avisaremos assim que for concluído.",
      retry: false,
    },
    in_review: {
      description: "O pagamento está em análise automática de risco e prevenção a fraudes. Essa avaliação considera fatores como histórico de transações, perfil do comprador e características do meio de pagamento. Nenhuma ação é necessária, a análise é concluída automaticamente e o pagamento será aprovado ou rejeitado.",
      message: "Seu pagamento está em análise. Avisaremos assim que for concluído.",
      retry: false,
    },
  },

  action_required: {
    waiting_payment: {
      description: "A transação requer uma ação adicional e está aguardando o pagamento. Isso significa que a transação foi iniciada, mas o pagamento ainda não foi concluído.",
      message: "Aguardando o pagamento. Conclua-o para finalizar a sua compra.",
      retry: false,
    },
    waiting_capture: {
      description: "A transação requer uma ação adicional e está aguardando a captura do pagamento. Isso significa que o pagamento foi autorizado, mas ainda não foi capturado.",
      message: "Pagamento autorizado. Estamos confirmando a sua compra.",
      retry: false,
    },
    waiting_transfer: {
      description: "A transação requer uma ação adicional e está aguardando a transferência dos valores. Isso significa que o pagamento foi iniciado, mas os valores ainda não foram transferidos para a conta do vendedor.",
      message: "Aguardando a confirmação da transferência. Se você já pagou, aguarde alguns instantes.",
      retry: false,
    },
    pending_challenge: {
      description: "Transação pendente de autenticação. O Challenge de 3DS foi iniciado e o comprador tem até 40 minutos para completá-lo.",
      message: "Confirme a compra no aplicativo do seu banco para concluir o pagamento. Você tem até 40 minutos.",
      retry: false, // o desafio 3DS está em andamento; só ofereça nova tentativa se virar 3ds_challenge_expired
    },
    waiting_retry: {
      description: "A transação está aguardando uma nova tentativa automática após uma tentativa de cobrança que falhou.",
      message: "Não conseguimos concluir a cobrança agora. Faremos uma nova tentativa automaticamente.",
      retry: false, // o próprio Mercado Pago tenta de novo; não crie outra order
    },
  },

  charged_back: {
    in_process: {
      description: "A transação sofreu uma contestação. Isso significa que foi contestada e o valor está sendo revertido.",
      message: "Este pagamento foi contestado e está em análise.",
      retry: false,
    },
    settled: {
      description: "A transação sofreu uma contestação. Isso significa que foi contestada e o valor foi reembolsado ao comprador.",
      message: "A contestação deste pagamento foi analisada e concluída.",
      retry: false,
    },
    reimbursed: {
      description: "A transação sofreu uma contestação. Isso significa que foi contestada e o valor foi disponibilizado ao vendedor.",
      message: "A contestação deste pagamento foi analisada e concluída.",
      retry: false,
    },
  },

  expired: {
    expired: {
      description: "A transação expirou. Isso significa que não foi concluída dentro do tempo limite e, portanto, foi encerrada.",
      message: "O tempo para pagar acabou. Gere um novo pagamento para continuar.",
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

  failed: {
    bad_filled_card_data: {
      description: "A transação falhou devido a dados do cartão preenchidos incorretamente. Isso pode incluir informações como número do cartão, CVV, data de validade, entre outros.",
      message: "Confira os dados do cartão (número, validade e código de segurança) e tente novamente.",
      retry: true,
    },
    invalid_card_token: {
      description: "A transação falhou. Isso significa que a transação falhou devido a um token de cartão inválido.",
      message: "Houve um problema ao ler o seu cartão. Por favor, preencha os dados novamente.",
      retry: true,
    },
    high_risk: {
      description: "A transação falhou devido a um alto risco detectado. Isso pode ocorrer quando o sistema de detecção de fraudes identifica um possível risco na transação.",
      message: "Não foi possível concluir o pagamento com este cartão. Tente outra forma de pagamento.", // não revele o motivo
      retry: true,
    },
    rejected_by_issuer: {
      description: "A transação falhou devido à rejeição pelo emissor do cartão.",
      message: "O banco emissor não autorizou a compra. Tente outro cartão ou entre em contato com o seu banco.",
      retry: true,
    },
    required_call_for_authorize: {
      description: "A transação falhou porque é necessária uma chamada para autorização. Isso pode ocorrer quando o emissor do cartão exige uma verificação adicional antes de aprovar a transação.",
      message: "O seu banco precisa autorizar esta compra. Ligue para ele ou tente outro cartão.",
      retry: true,
    },
    max_attempts_exceeded: {
      description: "A transação falhou devido ao número máximo de tentativas excedido. Pode ocorrer quando o número de tentativas de pagamento ultrapassa o limite permitido pelo sistema.",
      message: "Muitas tentativas seguidas. Aguarde alguns minutos ou use outra forma de pagamento.",
      retry: false,
    },
    card_disabled: {
      description: "A transação falhou devido ao cartão estar desativado. Isso pode ocorrer quando o cartão foi bloqueado ou desativado pelo emissor.",
      message: "Este cartão está desativado. Use outro cartão ou fale com o seu banco.",
      retry: true,
    },
    insufficient_amount: {
      description: "A transação falhou devido a um valor insuficiente. Pode ocorrer quando o saldo disponível não é suficiente para cobrir o valor da transação.",
      message: "Saldo ou limite insuficiente. Tente outro cartão ou outra forma de pagamento, como o Pix.",
      retry: true,
    },
    amount_limit_exceeded: {
      description: "A transação falhou devido ao limite de valor excedido. Isso pode ocorrer quando o valor da transação ultrapassa o limite permitido pelo emissor do cartão ou pelo sistema.",
      message: "O valor excede o limite permitido pelo seu cartão. Tente outro cartão ou pague com Pix.",
      retry: true,
    },
    processing_error: {
      description: "A transação falhou devido a um erro de processamento. Isso pode ocorrer quando há um problema técnico ou um erro no sistema que impede a conclusão da transação. Se o problema persistir, entre em contato com o suporte, forneça o x-request-id e mais detalhes sobre a operação realizada.",
      message: "Tivemos um problema técnico. Tente novamente em instantes.",
      retry: true,
    },
    invalid_installments: {
      description: "A transação falhou devido a parcelas inválidas. Pode ocorrer quando o número de parcelas selecionado não é aceito pelo emissor do cartão ou pelo sistema.",
      message: "Não foi possível usar esse parcelamento. Escolha outro número de parcelas.",
      retry: true,
    },
    "3ds_challenge_expired": {
      description: "A transação falhou devido à expiração do desafio 3DS. Pode ocorrer quando o tempo para completar a autenticação 3DS expirou.",
      message: "O tempo para confirmar a compra no aplicativo do seu banco acabou. Tente novamente.",
      retry: true,
    },
    card_insufficient_amount: {
      description: "O cartão escolhido para a transação não tem fundos suficientes.",
      message: "Saldo ou limite insuficiente. Tente outro cartão ou outra forma de pagamento, como o Pix.",
      retry: true,
    },
  },

  canceled: {
    canceled: {
      description: "A transação foi cancelada e não será processada.",
      message: "Este pagamento foi cancelado. Você pode iniciar um novo pagamento.",
      retry: true,
    },
  },

  in_review: {
    in_review: {
      description: "A order está em revisão. Essa revisão pode ser acionada por fatores relacionados à conta do comprador ou vendedor, ao meio de pagamento, ou às características da transação, como requisitos de conformidade ou regulatórios. Nenhuma ação é necessária, a menos que seja explicitamente solicitado.",
      message: "Seu pagamento está em análise. Avisaremos assim que for concluído.",
      retry: false,
    },
  },
};

// Status desconhecido: mensagem neutra e SEM nova tentativa,
// para evitar cobrança em duplicidade enquanto você investiga.
const DESCONHECIDO = {
  description: "Status não mapeado.",
  message: "Não foi possível concluir o pagamento agora. Tente novamente ou use outra forma de pagamento.",
  retry: false,
};

export default function getTransactionStatusInfo(status, statusDetail) {
  const grupo = TRANSACTION_STATUS[status];
  if (!grupo) return DESCONHECIDO;

  // Em "failed", o status_detail é o motivo; se vier um motivo novo, use mensagem genérica de falha
  if (status === 'failed') {
    return grupo[statusDetail] ?? {
      description: "Falha não mapeada.",
      message: "Não foi possível concluir o pagamento. Tente novamente ou use outra forma de pagamento.",
      retry: true,
    };
  }

  return grupo[statusDetail] ?? grupo[status] ?? DESCONHECIDO;
}