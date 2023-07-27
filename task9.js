(() => {
'use strict';
  //  保存している時のイベント
  const eventype2 = ['app.record.create.submit', 'app.record.edit.submit'];
  kintone.events.on(eventype2, async(event) => {
  //  console.log(event);
  //  自分のidを持ってきて
    const sum = event.record.重複禁止項目.value;
    console.log(event);
    const record_num = kintone.app.record.getId();
    let query = '重複禁止項目 = "' + sum + '"';

    if (record_num) {
      query = '重複禁止項目 = "' + sum + '" and レコード番号 != "' + record_num + '"';
    }

    const body = {
      app: kintone.app.getId(),
      query: query,
    };

    const content2 = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body);

    //  自分のIDが編集する際に、重複していると勘違いされることがある
    //  今自分のIDであればokというのを書く
    if (content2.records.length !== 0) {
      if (window.confirm('重複しているんですが、本当に保存しますか')) {
        return true;
      } else {
        return false;
      }
    }

    return event;
  });
})();

