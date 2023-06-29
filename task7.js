(() => {
  // console log を削除
  // もう一度watchdogに入れる
  'use strict';
  const eventype = ['app.record.create.show',
    'app.record.create.change.日付',
    'app.record.create.change.サイボウズ製品',
    'app.record.create.change.管理番号',
    'app.record.edit.show',
    'app.record.edit.change.日付',
    'app.record.edit.change.サイボウズ製品',
    'app.record.edit.change.管理番号'];

  kintone.events.on(eventype, (event) => {
    console.log(event);
    const data = event.record.日付.value;
    const product = event.record.サイボウズ製品.value;
    const num = event.record.管理番号.value;
    const record_word = event.record.重複禁止項目_文字列;
    // 挿入先の文字列フィールドの編集不可の処理
    record_word.disabled = true;


    const getSelectedProductName = (productValue) => {
      // ここに条件分岐の処理をかく
      if (productValue === 'kintone') {
        return '-KN';
      } else if (productValue === 'Garoon') {
        return '-GR';
      } else if (productValue === 'サイボウズOffice') {
        return '-OF';
      } else if (productValue === 'Mailwise') {
        return '-MW';
      }
      return '';
    };

    // ここに代入しました
    const productName = getSelectedProductName(product);
    const formatDate = dateFns.format(data, 'YYYYMMDD');
    const num_show = '-' + num;
    // sumの変数を削除
    event.record.重複禁止項目_文字列.value = formatDate + productName + num_show;

    return event;
  });


})();
