(() => {
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
      record_word.disabled = true;
      console.log(event.record.重複禁止項目_文字列);
  
      let product_show = '';
  
      if (product === 'kintone') {
        product_show = '-KN';
      } else if (product === 'Garoon') {
        product_show = '-GR';
      } else if (product === 'サイボウズOffice') {
        product_show = '-OF';
      } else if (product === 'Mailwise') {
        product_show = '-MW';
      }
      console.log(product_show);
  
      const formatDate = dateFns.format(data, 'YYYYMMDD');
      const num_show = '-' + num;
  
      const sum = formatDate + product_show + num_show;
      console.log(sum);
      event.record.重複禁止項目_文字列.value = sum;
  
      return event;
    });
  
    //  '-'を取り除く作戦：
    //  const formatDate = data.replace(/-/g, '');
    //  const sum = formatDate + product_show + num_show;
  
  })();