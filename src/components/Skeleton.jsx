export const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md ${className}`} />
    );
};

export const SkeletonCard = () => (
    <div className="glass-card p-5 space-y-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-2/3 h-6" />
        <Skeleton className="w-1/2 h-4" />
    </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
    <div className="space-y-4">
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2 py-1">
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-1/2 h-3" />
                </div>
            </div>
        ))}
    </div>
);
