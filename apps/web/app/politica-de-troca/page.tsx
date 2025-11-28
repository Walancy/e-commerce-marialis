"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function PoliticaTrocaPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1000px] mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Política de Troca e Devolução</h1>

                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                    <p>
                        A Marialis preza pela satisfação de seus clientes. Por isso, criamos uma política de troca e devolução baseada no Código de Defesa do Consumidor.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">1. Devolução por Arrependimento</h3>
                    <p>
                        O prazo para desistir da compra do produto é de até 7 (sete) dias corridos, a contar da data do recebimento. O produto deverá ser encaminhado na embalagem original, sem indícios de uso, sem violação do lacre original do fabricante, acompanhado de nota fiscal, manual e todos os seus acessórios.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">2. Produto com Defeito</h3>
                    <p>
                        A solicitação de troca deverá ser comunicada à nossa Central de Atendimento ao Cliente em até 7 (sete) dias corridos, a contar da data do recebimento. Se o produto adquirido em nossa loja apresentar defeito após 7 dias, a contar da data do recebimento, mas dentro do prazo de garantia do fabricante, você poderá entrar em contato com o fabricante para comunicar a ocorrência e obter esclarecimentos ou dirigir-se a uma das assistências técnicas credenciadas pelo próprio fabricante.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">3. Troca de Produtos</h3>
                    <p>
                        Para realizar a troca de um produto, entre em contato com nosso atendimento informando o número do pedido e o motivo da troca. O prazo para solicitação de troca é de 30 (trinta) dias corridos após o recebimento do produto.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">4. Reembolso</h3>
                    <p>
                        A restituição dos valores pagos será feita utilizando a mesma forma de pagamento escolhida no processo de compras. Em compras pagas com cartão de crédito, a administradora do cartão será notificada e o estorno ocorrerá na fatura seguinte ou na posterior, de uma só vez, qualquer que seja o número de parcelas utilizado na compra.
                    </p>

                    <div className="bg-gray-50 dark:bg-[#222] p-6 rounded-xl mt-8">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Canais de Atendimento</h4>
                        <p className="text-sm">
                            Para solicitar troca ou devolução, entre em contato através do e-mail: <span className="font-bold">trocas@marialis.com.br</span> ou pelo telefone <span className="font-bold">0800 123 4567</span>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
