(() => {
	'use strict';
	const action5 = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];
	kintone.events.on('app.record.create.show', (event) => {
	  console.log(event);
	  const location = event.record.Table.value;
	  const zero = event.record.Table.value[0];
	  console.log(location);
	  console.log(zero);
  
	  action5.forEach((val) => {
		zero.value.Action5.value = val;
		const clone = structuredClone(zero);
		location.push(clone);
	  });
  
	  location.shift();
	  return event;
	});
  
  })();
