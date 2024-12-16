import React from 'react';
import {AlertCircle} from "lucide-react";

interface ErrorProps {
    error?: string | null;
}

export const error: React.FC<ErrorProps> = ({error}) => {
    return (
        <div className="flex items-center p-4 text-red-600 bg-red-50 rounded-md">
            <AlertCircle className="mr-2 h-4 w-4"/>
            <span>{error}</span>
        </div>
    );
};

