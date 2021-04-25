import {request} from "./request";

export function getHomeMultidata(){
  return request({
    url:'api_all.ashx?appkey=aa0db33e44344dc3ae250fea8eebbc6f&page=1&page_size=5&sort=new'
  })
}
export function getHomeGoods(page_size,page){
  return request({
    url:'api_all.ashx?appkey=aa0db33e44344dc3ae250fea8eebbc6f&sort=new',
    params:{
      page_size,
      page
    }
  })
}
function test (){

}
