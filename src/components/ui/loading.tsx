import React from 'react';
import {Loader2} from "lucide-react";

interface loadingProps {
    isLoading?: boolean;
}

export const loading: React.FC<loadingProps> = () => {
    return (
        <div className="flex items-center justify-center p-4 text-amber-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            <span>Loading...</span>
        </div>
    );
};

