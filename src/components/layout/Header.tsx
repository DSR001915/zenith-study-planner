// no need to import React unless directly using it
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { FocusModeToggle } from '../features/FocusModeToggle';

export const Header = () => {
    const userName = "Student";

    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-3xl font-semibold dark:text-white">Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400">Welcome Back, {userName}!</p>
            </div>
            <div className="flex items-center gap-2">
                <FocusModeToggle />
                <ThemeSwitcher />
            </div>
        </header>
    );
};
