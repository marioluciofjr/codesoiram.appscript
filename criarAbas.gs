const planilha_ativa = SpreadsheetApp.getActive();
const abas = planilha_ativa.getSheetByName("COLOQUE AQUI A PLANILHA COM A LISTA DE NOMES DAS NOVAS ABAS");
const range_abas = abas.getRange("COLOQUE AQUI A CÉLULA COM O INTERVALO NECESSÁRIO").getValue();
const lista_de_abas = abas.getRange(range_abas).getValues();



function criarAbas() {

  for(var row = 0; row < lista_de_abas.length; row++){

    let nova_aba = planilha_ativa.insertSheet(row + 1);
    let nome_antigo = nova_aba.getName();
    let renomear = planilha_ativa.getSheetByName(nome_antigo).setName(lista_de_abas[row]);
    nova_aba.hideSheet();

   
  }

  abas.activate();
  abas.getRange(range_abas).clearContent();
  abas.getRange("COLOQUE AQUI UM INTERVALO A SER APAGADO").clearContent();
  
}
