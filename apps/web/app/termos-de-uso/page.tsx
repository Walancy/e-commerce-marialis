"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function TermosDeUsoPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1000px] mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Termos de Uso</h1>

                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">1. Termos</h3>
                    <p>
                        Ao acessar ao site Marialis, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">2. Uso de Licença</h3>
                    <p>
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Marialis , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>modificar ou copiar os materiais;</li>
                        <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                        <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Marialis;</li>
                        <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                        <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">3. Isenção de responsabilidade</h3>
                    <p>
                        Os materiais no site da Marialis são fornecidos 'como estão'. Marialis não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">4. Limitações</h3>
                    <p>
                        Em nenhum caso o Marialis ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Marialis, mesmo que Marialis ou um representante autorizado da Marialis tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Última atualização: Novembro de 2024.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
