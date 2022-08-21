import request from '@/utils/requests'

export function reqsupingList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
export function reqSaleAttrList(spuId) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}
export function reqattrInfoList(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    methos: 'get'
  })
}
export function reqAddSkuInfo(data) {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data
  })
}