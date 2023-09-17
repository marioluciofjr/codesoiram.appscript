var planilha = SpreadsheetApp.getActiveSpreadsheet();
var menu = planilha.getSheetByName("Menu");

function senha() {
  var ui = SpreadsheetApp.getUi();
  var senha_correta = "teste";

  var resposta = ui.prompt("DIGITE A SENHA", ui.ButtonSet.OK);

  if (resposta.getSelectedButton() == ui.Button.OK) {
    var senha_digitada = resposta.getResponseText();

    if (senha_digitada !== senha_correta) {
      ui.alert('SENHA INCORRETA!');
      senha();
    }
  } else {
    ui.alert("ATENÇÃO!🚨 " + "\n" + "\n" + "Você fechou a caixa de diálogo sem digitar a senha. Preencha a senha corretamente. Porém, caso não saiba ou tenha esquecido, entre em contato com a pessoa que desenvolveu a planilha");
    senha();
    SpreadsheetApp.flush();
  }
}


function ocultarAbas() {
  planilha.getSheetByName("COLOQUE O NOME DA ABA 2").hideSheet();
  planilha.getSheetByName("COLOQUE O NOME DA ABA 3").hideSheet();
  planilha.getSheetByName("COLOQUE O NOME DA ABA 4").hideSheet();
  planilha.getSheetByName("COLOQUE O NOME DA ABA 5").hideSheet();
}

function mostrarAbas() {
  planilha.getSheetByName("COLOQUE O NOME DA ABA 2").showSheet();
  planilha.getSheetByName("COLOQUE O NOME DA ABA 3").showSheet();
  planilha.getSheetByName("COLOQUE O NOME DA ABA 4").showSheet();
  planilha.getSheetByName("COLOQUE O NOME DA ABA 5").showSheet();
}

function onOpen() {
  ocultarAbas();
  SpreadsheetApp.flush();
  menu.activate();
  senha();
  mostrarAbas();
  menu.activate();
}
