const mongoose = require('mongoose');
const winston = require('winston');
const getStockPrice = require('../services/stock_pricer');

// Schemas

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        minLength: 1,
        maxLength: 4,
        get: v => v.toUpperCase(),
        set: v => v.toUpperCase(),
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    external_id: {
        type: String,
        required: true
    },
    photo: String,
    balance: {
        type: Number,
        default: 1000000,
        min: 0
    },
    spent: {
        type: Number,
        default: 0,
        min: 0
    },
    stocks: {
        type: [stockSchema],
        validate: [(stocks) => stocks.length < 4, 'Can only have 3 stocks at a time.']
    }
});

// Methods

userSchema.statics.findOrCreate = async function(profile, cb) {
    let user;
    try {
        user = await this.findOne({ external_id: profile.id });
        if (!user) {
            user = await this.create({
                name: profile.name.givenName,
                external_id: profile.id,
                photo: profile._json.picture
            });
            winston.info(`Creating new user: ${ user.name }--${ user._id }.`);
        }
        cb(null, user);
    } catch(err) {
        cb(err, null);
    }
};

userSchema.methods.getStocks = function(toDollars) {
    const stocks = [];
    this.stocks.forEach(s => {
        stocks.push({
            symbol: s.symbol,
            averageCost: toDollars(s.totalCost / s.quantity),
            quantity: s.quantity,
            totalCost: toDollars(s.totalCost)
        });
    });
    return stocks;
};

userSchema.methods.buy = async function(symbol, quantity) {
    const totalPrice = await getStockPrice(symbol) * quantity;
    if (totalPrice > this.balance - this.spent) return false;
    const stock = this.stocks.find(stock => stock.symbol === symbol);
    if (stock) {
        stock.quantity += quantity;
        stock.totalCost += totalPrice;
    } else {
        this.stocks.push({
            symbol: symbol,
            quantity: quantity,
            totalCost: totalPrice
        });
    }
    this.spent += totalPrice;
    await this.save();
    return true;
};

userSchema.methods.sell = async function(symbol, quantity) {
    const totalPrice =  await getStockPrice(symbol) * quantity;
    const owned = this.stocks.find(stock => stock.symbol === symbol);
    if (owned !== undefined && quantity > owned.quantity) return false;
    this.stocks.quantity -= quantity;
    this.stocks.totalCost -= totalPrice;
    this.spent -= totalPrice;
    await this.save();
    return true;
};

const User = mongoose.model('user', userSchema);

module.exports = User;