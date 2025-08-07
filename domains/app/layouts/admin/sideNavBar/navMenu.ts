export const navMenu = [
    {
        name: 'Dashboard',
        icon: 'mdi:home',
        path: '/admin/dashboard'
    },
    {
        name: 'product',
        icon: 'mdi:home',
        children: [
            {
                name: 'product list',
                path: '/admin/product/product-list'
            },
            {
                name: 'Category',
                path: '/admin/product/category'
            },
            {
                name: 'Variants',
                path: '/admin/product/variants'
            }
        ]
    },
    {
        name: 'orders',
        icon: 'mdi:home',
        path: '/admin/order'
    },
    {
        name: 'Settings',
        icon: 'mdi:home',
        path: '/admin/settings'
    }
    
    
]