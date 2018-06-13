
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "order",
  initialState: {
    showLoading:false,
    list: [],
    orderTypes:[],
    pageActive:1,
    pageSize:10,
    totalPages:1,
    detail:{}
  },
  reducers: {
    updateState(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async loadList(param, getState) {//加载数据
      actions.order.updateState({
        showLoading:true
      })
      if(param){
        param.pageIndex=param.pageActive-1;
        param.pageSize=param.pageSize;
      }else{
        param={}
      }
      let res= processData(await api.getList(param));
      actions.order.updateState({
        showLoading:false
      })
      if (res) {
        actions.order.updateState({ 
          list: res.content,
          pageActive:res.number+1,
          pageSize:res.size,
          totalPages:res.totalPages,
        });
      }
    },

    async getOrderType(param,getState){//订单类型
      let { data: { data, success } } = await api.getOrderType(param);
      if (success) {
        actions.order.updateState({ 
          orderTypes: data
        });
      }
    }

  }
};