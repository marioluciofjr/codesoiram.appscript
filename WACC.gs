/** 
 * Função WACC
 * @param capital_proprio É o valor do capital próprio da empresa determinado pelas condições de mercado
 * @param capital_de_terceiros É o valor do capital de terceiros determinado pelas condições de contrato
 * @param risk_free É a taxa livre de risco. Ex: Taxa Selic
 * @param beta É a medida de volatilidade ou risco sistemático
 * @param premio_risco É o prêmio pelo risco de investir em uma carteira de ativos do mercado (bolsa de valores). Ou seja, é o retorno esperado do mercado menos a taxa livre de risco.
 * @param risco_brasil É o indicador econômico que mostra aos investidores estrangeiros os riscos de investir no Brasil
 * @param retorno_capital_de_terceiros É o custo do capital de terceiros 
 * @param ir É o imposto de renda 
 * @return Traz o valor do WACC, que é o custo de capital utilizado para o cálculo de valuation no método do fluxo de caixa descontado
 * @customFunction
 
*/
function WACC(capital_proprio, capital_de_terceiros, risk_free, beta, premio_risco, risco_brasil, retorno_capital_de_terceiros, ir) {
  var resultado =  (((capital_proprio/(capital_proprio + capital_de_terceiros)) * (risk_free + (beta * premio_risco)) + risco_brasil) + (capital_de_terceiros/(capital_proprio + capital_de_terceiros)) * retorno_capital_de_terceiros) * (1 - ir);
  return resultado

}

/* Se não houver o valor do Risco Brasil no enunciado, deixar em branco para a fórmula dar o valor correto
*/
