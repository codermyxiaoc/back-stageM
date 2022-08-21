import request from '@/utils/requests'
export function reqproductList(page, limit, category3Id) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })
}
export function reqgetSpuById(spuId) {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}
export function reqbaseSaleAttrList() {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get'
  })
}
export function reqspuImageList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
export function reqspuTrademarkList() {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
  })
}
export function reqAddOrUpdataAttrInfo(attrinfo) {
  if(attrinfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: attrinfo
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: attrinfo
    })
  }
} 
export function reqdeletespu(spuId) {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}