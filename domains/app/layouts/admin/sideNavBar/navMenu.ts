export const navMenu = [
    {
        name: 'Dashboard',
        icon: 'mdi:home',
        path: '/admin'
    },
    {
        name: 'products',
        icon: 'mdi:home',
        path: '/admin',
        children: [
            {
                name: 'product list',
                path: '/admin'
            },
            {
                name: 'Category',
                path: '/admin'
            },
            {
                name: 'Variants',
                path: '/admin'
            }
        ]
    },
    {
        name: 'orders',
        icon: 'mdi:home',
        path: '/admin'
    },
    {
        name: 'Settings',
        icon: 'mdi:home',
        path: '/admin'
    }
    
    
]