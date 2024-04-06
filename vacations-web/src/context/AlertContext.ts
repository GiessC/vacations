import type { Severity } from '@/providers/AlertProvider';
import { createContext, type ReactNode } from 'react';

export interface IAlertContext {
    showAlert: (
        _title: string,
        _message: string,
        _severity?: Severity,
        _icon?: ReactNode,
    ) => void;
}

const DEFAULT_VALUES: IAlertContext = {
    showAlert: () => {},
};

const AlertContext = createContext<IAlertContext>(DEFAULT_VALUES);

export default AlertContext;
