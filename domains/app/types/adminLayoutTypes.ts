export interface MenuItemProps {
    menuLinkItem: {
        name: string
        icon: string
        path    ?: string
        children?: ChildrenMenu[]
    }
 }

 type ChildrenMenu = {
    name    ?: string
    icon    ?: string
    path     : string
 }