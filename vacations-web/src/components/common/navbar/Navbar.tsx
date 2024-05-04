import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import AuthContext from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import React, { useContext } from 'react';
import { BsPersonCircle as AvatarIcon } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

const getLink = (currentLocation: string, href: string) => {
    return currentLocation === href ? '#' : href;
};

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await logout();
            console.log('Logged out successfully');
            navigate('/auth/login');
        } catch (error: unknown) {
            console.error(error);
            throw error;
        }
    };

    if (!user) {
        return null;
    }

    return (
        <NavigationMenu className='min-w-full'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={navigationMenuTriggerStyle()}
                        >
                            <AvatarIcon className='w-5 h-5' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                {user.getUsername()}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <MenuLink
                                    className='cursor-pointer'
                                    key='logout'
                                    title='Logout'
                                    onClick={onLogout}
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <NavigationMenuContent></NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const MenuLink = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                    className,
                )}
                {...props}
            >
                <div className='text-sm font-medium leading-none'>{title}</div>
                <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    );
});
MenuLink.displayName = 'ListItem';

export default Navbar;
