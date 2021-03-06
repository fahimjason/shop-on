const path = require('path');
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize'));
const { DataTypes } = require('sequelize');
const Product = require(path.join(process.cwd(), "src/modules/product/product.model"));
const Order = require(path.join(process.cwd(), "src/modules/order/order.model"));

const OrderProduct = sequelize.define('order_products', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    order_id: {  
        allowNull: false,
        type: DataTypes.UUID
    },
    product_id: {
        allowNull: false,        
        type: DataTypes.UUID
    },
    quantity: {
        allowNull: false,        
        type: DataTypes.INTEGER
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
}, {
    tableName: 'order_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Order.hasMany(OrderProduct, { as: 'order_products', foreignKey: 'order_id' });
OrderProduct.belongsTo(Product, { as: "product", foreignKey: "product_id" });

module.exports = OrderProduct;