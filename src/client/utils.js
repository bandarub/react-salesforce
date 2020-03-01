export const normalizeProperty = item => ({
  thumbnail: item.thumbnail__c,
  name: item.title__c,
  desc: `${item.city__c}, ${item.state__c} - ${formatter.format(item.price__c)}`
});

export const normalizeBrokerData = item => ({
  thumbnail: item.picture__c,
  name: item.name,
  desc: item.title__c
});


export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
