(() => {
    'use strict';
  
    kintone.events.on('app.record.create.show', async (event) => {
      console.log(event);
      const location = event.record.Table.value;
      const zero = event.record.Table.value[0];
      const body = {
        'app': 18,
      };
  
      const space = [];
  
      const content = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json'), 'GET', body);
      // console.log(content);
      const action5 = content.properties.Table.fields.Action5.options;
      Object.values(action5).forEach((ele) => {
        space.push(ele);
      });
      // console.log(action5);
      console.log(space);
  
      const indexArr = space.sort((a, b) => (a.index) - (b.index));
      console.log(indexArr);
  
      location.shift();
      const clone = structuredClone(zero);
  
      Object.keys(indexArr).forEach((val) => {
        console.log(val);
        location.push(structuredClone(clone));
        location[val].value.Action5.value = indexArr[val].label;
      });
      return event;
    });
  
  
  })();