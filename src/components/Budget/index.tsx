"use client";


import { useBudget } from './useBudget';
import { DesktopBudget } from './DesktopBudget';
import { MobileBudget } from './MobileBudget';

export const Budget = () => {
    const budgetLogic = useBudget();

    return (
        <>
            <div className="block lg:hidden h-full">
                <MobileBudget {...budgetLogic} />
            </div>
            <div className="hidden lg:block h-full">
                <DesktopBudget {...budgetLogic} />
            </div>
        </>
    );
};
