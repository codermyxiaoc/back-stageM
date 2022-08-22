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
export function reqfindBySpuId(spuId) {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
export function reqproductlist(page,limit) {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}
export function reqonSale(skuId) {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}
export function reqcancelSale(skuId) {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    mehod: 'gte'
  })
}
export function reqSkuById(skuId) {
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
  })
}
export function reqdeleteSku(skuId) {
  return request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
}