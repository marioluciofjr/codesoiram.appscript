function listarArquivos() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE RECEBERÁ A LISTA");

  guia.getRange("COLOQUE AQUI O INTERVALO QUE A LISTA APARECERÁ. EX: A5:A").clear();
  var id = guia.getRange("COLOQUE AQUI A CÉLULA QUE TERÁ O NÚMERO DE ID DO ENDEREÇO DO DRIVE").getValue();
  var pasta = DriveApp.getFolderById(id);

  var lista = [];

  var arquivos = pasta.getFiles();
  while(arquivos.hasNext()){
    var arquivo = arquivos.next();

    var linha = [];

    linha.push(arquivo.getName());

    lista.push(linha)
  }

  guia.getRange(COLOQUE AQUI O NÚMERO DA LINHA QUE COMEÇA O SEU INTERVALO, 1, lista.length, lista[0].length).setValues(lista);

  Browser.msgBox("Lista Atualizada");
  
}

/* Pense na seguinte estrutura:
 Célula A1: cabeçalho [opcional]
 Célula A2: você cola o endereço do drive que copiou na barra de endereço do navegador
 Célula A3: você pegará o endereço do ID com a fórmula =EXT.TEXTO(A2;40;50)
 Célula A4: cabeçalho [opcional]
 Célula A5:A sua lista
 Você pode pensar em fazer em outra coluna, mas desde que mantenha essa linha de raciocínio
 Apague esses comentários feitos com # ao inserir o código no apps script
 */
