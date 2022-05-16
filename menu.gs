function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [{name: "COLOQUE AQUI O NOME QUE VOCÊ DARÁ PARA O SUBMENU", functionName: "COLOQUE AQUI A FUNCTION CRIADA PARA ESSE NOME"},
                      null,
                     {name: "COLOQUE AQUI O NOME QUE VOCÊ DARÁ PARA O SUBMENU", functionName: "COLOQUE AQUI A FUNCTION CRIADA PARA ESSE NOME"},
                     {name: "COLOQUE AQUI O NOME QUE VOCÊ DARÁ PARA O SUBMENU", functionName: "COLOQUE AQUI A FUNCTION CRIADA PARA ESSE NOME"},
                      null,
                     {name: "COLOQUE AQUI O NOME QUE VOCÊ DARÁ PARA O SUBMENU", functionName: "COLOQUE AQUI A FUNCTION CRIADA PARA ESSE NOME"},
                     {name: "COLOQUE AQUI O NOME QUE VOCÊ DARÁ PARA O SUBMENU", functionName: "COLOQUE AQUI A FUNCTION CRIADA PARA ESSE NOME"},
                      ];

  ss.addMenu("COLOQUE AQUI O NOME DO MENU", menuEntries);
}

/* Se você quiser mais intervalos entre um submenu e outro, só acrescentar null, depois da linha {name: "nome", functionName: "function"},
 Coloque quantas linhas names achar melhor 
 Apague esses três comentários com # ao inserir o código no seu apps script
 */
