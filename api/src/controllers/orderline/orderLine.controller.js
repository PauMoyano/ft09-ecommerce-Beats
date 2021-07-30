const { OrderLine } = require("../../db");

module.exports = {
  createOrderLine: async (order) => {
    var newOrder = order;
    try {
        return await OrderLine.findAll().then(async (orders)=>{
          var aux = false
          console.log("AUX", aux)
          for (let i = 0; i < orders.length; i++) {

            if(orders[i].dataValues.orderId === newOrder.orderId && orders[i].dataValues.productId === newOrder.productId){
              // console.log("ID Product ES IGUAL", orders[i].dataValues.productId)
              // console.log("ID PRODUCT ORDER DEL FRONT ", newOrder.productId)
              // console.log("ID ORDER ES IGUAL", orders[i].dataValues.orderId)
              // console.log("ID ORDER ORDER DEL FRONT ", newOrder.orderId)
              aux = true
             }            
          }
          console.log("AUX 2", aux)
          if(!aux){
            return await OrderLine.create(order)
          }
        })
    } catch (error) {
      console.log(error)
    } 

    //   return await OrderLine.findOrCreate(order,{
  //     where: {
  //       productId: order.product.id
  //   }
  // }).then((order) => order);
  },
  getOrderLines: async () => {
    return await OrderLine.findAll().then((orders) => orders);
  },
  getOrderLineById: async (idOrder) => {
    return await OrderLine.findByPk(idOrder).then((order) => order);
  },
  editOrderLine: async (orderLineId, order) => {
    return await OrderLine.update(order, {
      where: {
        id: orderLineId,
      },
    }).then((order) => order);
  },
  deleteOrderLine: async (orderLineId) => {
    return await OrderLine.destroy({
      where: {
        id: orderLineId,
      },
    }).then((order) => order);
  },
  deleteAllOrderLineByOrderId: async (orderId) => {
    return await OrderLine.destroy({
      where: {
        orderId: orderId,
      },
    }).then((order) => order);
  },
};
