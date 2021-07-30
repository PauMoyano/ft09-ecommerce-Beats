const { Order, OrderLine } = require("../../db");

module.exports = {
  createOrder: async (order) => {
    return await Order.create(order).then((order) => order);
  },
  getOrders: async () => {
    return await Order.findAll().then((orders) => orders);
  },
  getOrderById: async (idOrder) => {
    return await Order.findByPk(idOrder, {
      include: [{ model: OrderLine }],
    }).then((order) => order);
  },
  editOrder: async (orderId, order) => {
    return await Order.update(order, {
      where: {
        id: orderId,
      },
    }).then((order) => order);
  },
  deleteOrder: async (orderId) => {
    return await Order.update(
      {
        orderStatus: "cancel",
      },
      {
        where: {
          id: orderId,
        },
      }
    ).then((order) => order);
  },
  getOrdersByUserID : async (userId, orderStatus) => {
    var newUserId = userId;
  
    if(orderStatus === "all"){
      return await Order.findAll({
          where:{
            userId:userId
          },
          include:[
            {
              model: OrderLine,
            },
          ]
        }).then((orders)=>{
          return orders
        }).catch((error)=>{
          return error
        })
    }else if(orderStatus === "cart"){
      return await Order.findAll({
        where:{
          userId:userId,
          orderStatus:"cart"
        },
        include:[
          {
            model: OrderLine,
          },
        ]
      }).then((order)=>{
       
        if(order.length < 1){
          let newOrder={
            userId:newUserId,
            total:0,
            orderStatus: "cart"
          }
          return Order.create(newOrder).then((order) => order);
        }
        return order
      }).catch((error)=>{
        return error
      })
    }else{
  
      return await Order.findAll({
        where:{
          userId:userId,
          orderStatus:"cart"
        },
        include:[
          {
            model: OrderLine,
          },
        ]
      }).then((orders)=>{
       
        return orders
      }).catch((error)=>{
        return error
      })
    }

  }
};
