function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('General Affairs System')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getAllGAData() {
  try {
    var ss = SpreadsheetApp.openById('15Wm6W9JbYmH6g_1BMjXiAV99d6-BVIFE_hzxBEk2rog');
    
    // Pastikan nama sheet di bawah ini SAMA PERSIS dengan nama tab di file Spreadsheet Anda
    return {
      aset: getSheetValues(ss, 'Aset dan Inventaris'),
      permintaan: getSheetValues(ss, 'Permintaan Barang'),
      maintenance: getSheetValues(ss, 'Maintenance'),
      kendaraan: getSheetValues(ss, 'Kendaraan Operasional'),
      pemakaian: getSheetValues(ss, 'Pemakaian Kendaraan'),
      master: getSheetValues(ss, 'Master Barang'),
      atk: getSheetValues(ss, 'ATK'),
      legalitas: getSheetValues(ss, 'Dokumen Legalitas')
    };
  } catch (err) {
    throw new Error("Gagal membuka Spreadsheet: " + err.message);
  }
}

function getSheetValues(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    console.error("Sheet tidak ditemukan: " + sheetName);
    return [["Error: Sheet " + sheetName + " tidak ditemukan"]];
  }
  
  // Mengambil data dan memastikan tidak ada masalah dengan baris kosong
  var data = sheet.getDataRange().getDisplayValues();
  return data.length > 0 ? data : [["Sheet Kosong"]];
}