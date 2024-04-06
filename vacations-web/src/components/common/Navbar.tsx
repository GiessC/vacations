import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import AuthContext from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import React, { useContext } from 'react';
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

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {user ? (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href={getLink(location.pathname, '/')}
                            >
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem onClick={onLogout}>
                            <NavigationMenuTrigger
                                className={navigationMenuTriggerStyle()}
                            >
                                Profile {/* TODO: Change this to an icon */}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                                    <ListItem
                                        className='cursor-pointer'
                                        key='logout'
                                        title='Logout'
                                        onClick={onLogout}
                                    />
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </>
                ) : (
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            href={getLink(location.pathname, '/auth/login')}
                        >
                            Login
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}
                >
                    <div className='text-sm font-medium leading-none'>
                        {title}
                    </div>
                    <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';

export default Navbar;
