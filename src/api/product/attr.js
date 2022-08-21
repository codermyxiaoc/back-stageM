import request from '@/utils/requests'
export function reqCategoryone() {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}
export function reqCategorytow(category1Id) {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}
export function reqCategorytherr(category2Id) {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}
export function reqgetattrInfoList(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}
export function reqAddorUpdataattr(data) {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
export function reqdeleteattr(attrId){
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
