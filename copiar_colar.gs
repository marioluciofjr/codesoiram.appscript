function copiar_colar() {

var planilha = SpreadsheetApp.getActiveSpreadsheet();

var dados = planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE VOCÊ VAI COPIAR OS DADOS");
var colagem = planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE VOCÊ VAI COLAR OS DADOS");
var qtdelinhas = dados.getRange("COLOQUE AQUI UMA CÉLULA QUE DETERMINARÁ O NÚMERO DE LINHAS A SEREM COPIADAS").getValue();

var area = dados.getActiveCell().offset(0, 0, qtdelinhas, COLOQUE AQUI O NÚMERO DE COLUNAS QUE VOCÊ COPIARÁ).activate();

var linha = colagem.getLastRow() + 1;

var colar = "A" + linha;

area.copyTo(colagem.getRange(colar),SpreadsheetApp.CopyPasteType.PASTE_FORMAT.PASTE_VALUES,false);

Browser.msgBox("Copiado com Sucesso!")

}

/* Você pode determinar o número de linhas a serem copiadas ao usar a fórmula =CONT.VALORES(), por exemplo.
 Apague esses comentários feitos com # ao inserir o código no apps script
 */
