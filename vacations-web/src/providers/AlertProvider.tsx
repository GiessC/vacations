import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AlertContext from '@/context/AlertContext';
import {
    AlertCircle,
    CircleCheckBig,
    MessageSquareMore,
    TriangleAlert,
} from 'lucide-react';
import {
    useMemo,
    useState,
    type PropsWithChildren,
    type ReactNode,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Severity = 'error' | 'warning' | 'info' | 'success';

export interface IAlert {
    id: string;
    title: string;
    message: string;
    severity: Severity;
    icon: ReactNode;
}

const ALERT_TIMEOUT_MS = 5 * 1000;

const iconClassName = 'w-4 h-4';

const severityIcons: Record<Severity, ReactNode> = {
    error: <AlertCircle className={iconClassName} />,
    warning: <TriangleAlert className={iconClassName} />,
    info: <MessageSquareMore className={iconClassName} />,
    success: <CircleCheckBig className={iconClassName} />,
};

const AlertProvider = ({ children }: PropsWithChildren) => {
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    const showAlert = (
        title: string,
        message: string,
        severity: Severity = 'info',
        icon?: ReactNode,
    ) => {
        const alert: IAlert = {
            id: uuidv4(),
            title,
            message,
            severity,
            icon: icon ?? severityIcons[severity],
        };
        setAlerts((prevAlerts: IAlert[]) => [...prevAlerts, alert]);

        setTimeout(() => {
            setAlerts((prevAlerts: IAlert[]) => prevAlerts.slice(1));
        }, ALERT_TIMEOUT_MS);
    };

    const contextValue = useMemo(() => {
        return {
            showAlert,
        };
    }, []);

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <div className='flex flex-col space-y-2 absolute left-4 bottom-4 w-96 h-auto'>
                {alerts.map((alert: IAlert) => (
                    <Alert
                        key={alert.id}
                        variant={
                            alert.severity === 'error'
                                ? 'destructive'
                                : 'default'
                        }
                    >
                        {alert.icon}
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export default AlertProvider;
