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

    //普通に書き込み
    kintone.events.on(eventype, (event) => {
        // console.log(event);
        const data = event.record.日付.value;
        const product = event.record.サイボウズ製品.value;
        const num = event.record.管理番号.value;
        const record_word = event.record.重複禁止項目.value;

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
        // console.log(product_show);

        // 日にち
        const formatDate = dateFns.format(data, 'YYYYMMDD');
        const num_show = '-' + num;
    
        const sum = formatDate + product_show + num_show;
        // console.log(sum);
        event.record.重複禁止項目.value = sum;
    
        return event;
    });

    //保存している時のイベント
    const eventype2 = ['app.record.create.submit','app.record.edit.submit'];
    kintone.events.on(eventype2, async(event) => {
        // console.log(event);

        //自分のidを持ってきて
        const sum = event.record.重複禁止項目.value;
        console.log(event);
        const record_num =kintone.app.record.getId();
        let query ='重複禁止項目 = "'+ sum +'"';

        if (record_num)
        {
            query = '重複禁止項目 = "'+ sum +'" and レコード番号 != "'+ record_num + '"' 
        }

        const body = {
            app: 16,
            // id:kintone.app.record.getId(),
            query: query,
        };


        const content2 = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body);
        console.log(content2);
        
        console.log(content2.records.length);
        console.log(content2.records.length);

        //自分のIDが編集する際に、重複していると勘違いされることがある
        //今自分のIDであればokというのを書く
        if (content2.records.length !=0){
            if(window.confirm('重複しているんですが、本当に保存しますか')) {
                return true;
            }else{
                return false;
            }
        }
    return event;
    });

    // const eventype3 = ['app.record.edit.submit'];
    // kintone.events.on(eventype3, async(event) => {
    //     // console.log(event);
    //     //自分のidを持ってきて
    //     const sum = event.record.重複禁止項目.value;
    //     const body = {
    //         app: 16,
    //         id:kintone.app.record.getId(),
    //         query: '重複禁止項目 = "'+ sum + '"',
    //     };
    //     const content2 = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body);
    //     console.log(content2);
    //     console.log(content2.records.length);

    //     //自分のIDが編集する際に、重複していると勘違いされることがある
    //     //今自分のIDであればokというのを書く
    //     if (content2.records.length !=0){
    //         if(window.confirm('重複しているんですが、本当に保存しますか')) {
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     }
    // return event;
    // });

})();  



