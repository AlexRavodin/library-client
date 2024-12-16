import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@/utils/AuthProvider';
import {UseDataFetch} from '@/hooks/UseDataFetch';
import {Button} from '@/components/ui/button';
import {loading as Loading} from "@/components/ui/loading";
import {format} from 'date-fns';
import {Book} from "@/dto/book/Book.ts";
import {User} from "@/dto/user/User.ts";

interface Loan {
    id: number;
    loan_start_date: string;
    loan_end_date: string;
    returned: boolean;
    user: User;
    book: Book;
}

/*interface LoanResponse {
    message: string;
    data: Loan[];
}*/

const LoanListPage: React.FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const {data: loans, loading, error} = UseDataFetch<Loan[]>('loans');

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        if (!user) {
            console.log(user);
            navigate("/unauthorized");
        }
    }, [user, navigate]);

    const handleStatusChange = async (loanId: number, newStatus: boolean) => {
        try {
            await fetch(`/api/loans/${loanId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({returned: newStatus}),
            });
        } catch (error) {
            console.error('Error updating loan status:', error);
        }
    };

    const handleDelete = async (loanId: number) => {
        if (window.confirm('Are you sure you want to delete this loan?')) {
            try {
                await fetch(`/api/loans/${loanId}`, {method: 'DELETE'});
            } catch (error) {
                console.error('Error deleting loan:', error);
            }
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error occurred: {error.errorMessage}.</div>;
    }

    if (!loans) {
        return <div>No loan data available.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Loan List</h1>
            <div className="grid grid-cols-1 gap-6">
                {loans.map((loan) => (
                    <div key={loan.id} className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{loan.book.title}</h2>
                            <span
                                className={`px-2 py-1 rounded ${loan.returned ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                {loan.returned ? 'Returned' : 'Not Returned'}
                            </span>
                        </div>
                        <p><strong>User:</strong> {loan.user.name}</p>
                        <p><strong>Start Date:</strong> {format(new Date(loan.loan_start_date), 'dd/MM/yyyy')}</p>
                        <p><strong>End Date:</strong> {format(new Date(loan.loan_end_date), 'dd/MM/yyyy')}</p>
                        {isAdmin && (
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button
                                    onClick={() => handleStatusChange(loan.id, !loan.returned)}
                                    variant={loan.returned ? "outline" : "default"}
                                >
                                    {loan.returned ? 'Mark as Not Returned' : 'Mark as Returned'}
                                </Button>
                                <Button variant="default" onClick={() => handleDelete(loan.id)}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoanListPage;

