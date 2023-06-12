function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Meu Menu')
    .addItem('Item 1', 'funcaoItem1')
    .addItem('Item 2', 'funcaoItem2')
    .addSeparator()
    .addSubMenu(ui.createMenu('Submenu')
      .addItem('Subitem 1', 'funcaoSubitem1')
      .addItem('Subitem 2', 'funcaoSubitem2')
    )
    .addToUi();
}
