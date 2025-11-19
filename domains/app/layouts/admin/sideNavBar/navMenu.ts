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
            },
            {
                name: 'Property',
                path: '/admin/product/property'
            },
            {
                name: 'Brands',
                path: '/admin/product/brand'
            },
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