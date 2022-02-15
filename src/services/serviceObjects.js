export const productsServiceObject = (page, limit) => ({
    url: '/api/products',
    params: {
        _page: page,
        _limit: limit
    }
})  