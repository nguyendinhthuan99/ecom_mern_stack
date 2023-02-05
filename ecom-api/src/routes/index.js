const authRoute = require('./auth.js')
const userRoute = require('./user.js')
const cartRoute = require('./cart.js')
const orderRoute = require('./order.js')
const stripeRoute = require('./stripe.js')
const productRoute = require('./product.js')

function route(app) {
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/cart', cartRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/stripe', stripeRoute)
    app.use('/api/product', productRoute)

    app.use('/', (req, res, next) => {
        res.send('index page')
    })
}
module.exports = route